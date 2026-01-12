"""
AI Agent for Fraud Detection
Uses LangChain ReAct pattern with custom tools
"""
from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import Tool
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from typing import Dict, List
import os
from blockchain_service import get_blockchain_service

class FraudDetectionAgent:
    """
    Autonomous AI Agent for detecting payment fraud
    Uses Gemini 2.5 Flash with Groq/Mistral fallback
    """
    
    def __init__(self):
        self.blockchain = get_blockchain_service()
        self.llm = self._initialize_llm()
        self.tools = self._create_tools()
        self.agent = self._create_agent()
        
    def _initialize_llm(self):
        """Initialize LLM with fallback"""
        google_api_key = os.getenv("GOOGLE_API_KEY")
        groq_api_key = os.getenv("GROQ_API_KEY")
        
        if google_api_key and google_api_key != "your-gemini-api-key-here":
            # Primary: Gemini 2.5 Flash (FREE tier: 15 RPM)
            return ChatGoogleGenerativeAI(
                model="gemini-2.5-flash",
                google_api_key=google_api_key,
                temperature=0.1,  # Low temperature for consistent fraud detection
                max_tokens=1000
            )
        elif groq_api_key and groq_api_key != "your-groq-api-key-here":
            # Fallback: Mistral 7B via Groq (FREE, ultra-fast)
            return ChatGroq(
                model="mixtral-8x7b-32768",
                groq_api_key=groq_api_key,
                temperature=0.1
            )
        else:
            raise Exception("No AI API keys configured. Please set GOOGLE_API_KEY or GROQ_API_KEY in .env")
    
    def _create_tools(self) -> List[Tool]:
        """Create custom tools for the agent"""
        
        def analyze_wallet(address: str) -> str:
            """Analyze blockchain wallet data"""
            try:
                profile = self.blockchain.get_wallet_profile(address)
                return f"""
Wallet Analysis for {address}:
- Transaction Count: {profile.get('transaction_count', 0)}
- Wallet Age: {profile.get('wallet_age_days', 0)} days
- ETH Balance: {profile.get('balance_eth', 0)} ETH
- Is Contract: {profile.get('is_contract', False)}
- Recent Small TX: {profile.get('has_recent_small_tx', False)}
"""
            except Exception as e:
                return f"Error analyzing wallet: {str(e)}"
        
        def detect_patterns(recipient_address: str, amount: float) -> str:
            """Detect known fraud patterns"""
            profile = self.blockchain.get_wallet_profile(recipient_address)
            patterns = []
            
            # Pattern 1: Fresh Wallet
            tx_count = profile.get('transaction_count', 0)
            if tx_count < 5:
                patterns.append(f"FRESH_WALLET: Only {tx_count} transactions")
            
            # Pattern 2: Penny Drop
            if profile.get('has_recent_small_tx', False):
                patterns.append("PENNY_DROP: Recent small test transaction detected")
            
            # Pattern 3: New Wallet
            wallet_age = profile.get('wallet_age_days', 0)
            if wallet_age < 7:
                patterns.append(f"NEW_WALLET: Created {wallet_age} days ago")
            
            # Pattern 4: Zero Balance
            balance = profile.get('balance_eth', 0)
            if balance == 0 and tx_count > 0:
                patterns.append("ZERO_BALANCE: No funds despite transaction history")
            
            if not patterns:
                return "No fraud patterns detected"
            
            return "Detected Patterns:\n" + "\n".join(f"- {p}" for p in patterns)
        
        def calculate_risk_score(patterns_found: str) -> str:
            """Calculate numerical risk score based on patterns"""
            score = 0
            
            if "FRESH_WALLET" in patterns_found:
                score += 35
            if "PENNY_DROP" in patterns_found:
                score += 40
            if "NEW_WALLET" in patterns_found:
                score += 25
            if "ZERO_BALANCE" in patterns_found:
                score += 20
            
            # Cap at 100
            score = min(score, 100)
            
            if score >= 70:
                level = "HIGH"
                action = "VAULT_LOCK"
                delay = 3600  # 1 hour
            elif score >= 40:
                level = "MEDIUM"
                action = "VAULT_LOCK"
                delay = 1800  # 30 minutes
            else:
                level = "LOW"
                action = "INSTANT_SEND"
                delay = 0
            
            return f"""
Risk Score: {score}/100
Risk Level: {level}
Recommended Action: {action}
Vault Delay: {delay} seconds
"""
        
        return [
            Tool(
                name="AnalyzeWallet",
                func=analyze_wallet,
                description="Analyze blockchain wallet data (transaction count, age, balance). Input: wallet address"
            ),
            Tool(
                name="DetectPatterns",
                func=detect_patterns,
                description="Detect fraud patterns (penny drop, fresh wallet, etc.). Input: recipient_address,amount (comma-separated)"
            ),
            Tool(
                name="CalculateRiskScore",
                func=calculate_risk_score,
                description="Calculate risk score from detected patterns. Input: patterns description"
            )
        ]
    
    def _create_agent(self) -> AgentExecutor:
        """Create ReAct agent with custom prompt"""
        
        prompt = PromptTemplate.from_template("""
You are a fraud detection AI agent protecting users from Authorized Push Payment (APP) scams.

Your task: Analyze a payment transaction and determine if it's fraudulent.

Available tools:
{tools}

Tool Names: {tool_names}

Use this format:

Question: the transaction to analyze
Thought: analyze what data you need
Action: the tool to use
Action Input: the input to the tool
Observation: the result from the tool
... (repeat Thought/Action/Observation as needed)
Thought: I now have enough information to make a final decision
Final Answer: A JSON object with your fraud assessment

Transaction to analyze:
{input}

{agent_scratchpad}

Remember:
- Use AnalyzeWallet to get blockchain data
- Use DetectPatterns to identify scam patterns
- Use CalculateRiskScore to get final risk score
- Explain your reasoning in natural language
- Final Answer must be valid JSON
""")
        
        agent = create_react_agent(
            llm=self.llm,
            tools=self.tools,
            prompt=prompt
        )
        
        return AgentExecutor(
            agent=agent,
            tools=self.tools,
            verbose=True,
            max_iterations=5,
            handle_parsing_errors=True
        )
    
    def analyze_transaction(self, sender: str, recipient: str, amount: float) -> Dict:
        """
        Main method: Analyze transaction for fraud
        Returns structured risk assessment
        """
        try:
            # Run agent
            result = self.agent.invoke({
                "input": f"""
Analyze this payment transaction for fraud:
- Sender: {sender}
- Recipient: {recipient}
- Amount: {amount} MNEE

Determine:
1. Is the recipient wallet suspicious?
2. What fraud patterns are present?
3. What is the risk score (0-100)?
4. Should we lock funds in vault or allow instant send?
5. Explain why in simple terms for the user

Return JSON with: risk_score, risk_level, recommended_action, vault_delay_seconds, patterns_detected, scam_explanation
"""
            })
            
            # Parse agent output
            output = result.get("output", "{}")
            
            # Extract structured data from agent response
            # (In production, use better JSON parsing)
            return self._parse_agent_output(output, recipient)
            
        except Exception as e:
            print(f"Agent error: {e}")
            # Fallback to rule-based
            return self._fallback_analysis(recipient, amount)
    
    def _parse_agent_output(self, output: str, recipient: str) -> Dict:
        """Parse agent's natural language output into structured format"""
        # Simple parsing (in production, use structured output)
        profile = self.blockchain.get_wallet_profile(recipient)
        
        # Calculate score based on patterns
        score = 0
        patterns = []
        reasons = []
        
        tx_count = profile.get('transaction_count', 0)
        wallet_age = profile.get('wallet_age_days', 0)
        has_small_tx = profile.get('has_recent_small_tx', False)
        balance = profile.get('balance_eth', 0)
        
        if tx_count < 5:
            score += 35
            patterns.append("FRESH_WALLET")
            reasons.append(f"Recipient is a fresh wallet ({tx_count} transactions)")
        
        if has_small_tx:
            score += 40
            patterns.append("PENNY_DROP")
            reasons.append("Penny Drop pattern: Recent small test transaction detected")
        
        if wallet_age < 7:
            score += 25
            patterns.append("NEW_WALLET")
            reasons.append(f"Very new wallet (created ~{wallet_age} days ago)")
        
        if balance == 0 and tx_count > 0:
            score += 20
            patterns.append("ZERO_BALANCE")
            reasons.append("Wallet has zero balance despite transaction history")
        
        # Determine risk level
        if score >= 70:
            risk_level = "HIGH"
            action = "VAULT_LOCK"
            delay = 3600
        elif score >= 40:
            risk_level = "MEDIUM"
            action = "VAULT_LOCK"
            delay = 1800
        else:
            risk_level = "LOW"
            action = "INSTANT_SEND"
            delay = 0
        
        # Generate explanation
        if patterns:
            explanation = f"This transaction shows signs of a scam. {' '.join(reasons)}"
        else:
            explanation = "No significant fraud patterns detected. Transaction appears safe."
        
        return {
            "risk_score": score,
            "risk_level": risk_level,
            "vault_delay_seconds": delay,
            "recommended_action": action,
            "reasons": reasons,
            "patterns_detected": patterns,
            "scam_explanation": explanation,
            "recipient_profile": {
                "address": recipient,
                "transaction_count": tx_count,
                "wallet_age_days": wallet_age,
                "balance_eth": balance
            }
        }
    
    def _fallback_analysis(self, recipient: str, amount: float) -> Dict:
        """Fallback rule-based analysis if agent fails"""
        profile = self.blockchain.get_wallet_profile(recipient)
        return self._parse_agent_output("", recipient)

# Singleton instance
_fraud_agent = None

def get_fraud_agent() -> FraudDetectionAgent:
    """Get or create fraud detection agent"""
    global _fraud_agent
    if _fraud_agent is None:
        _fraud_agent = FraudDetectionAgent()
    return _fraud_agent
