"""
AI Risk Engine - Scam Pattern Detection
Analyzes transactions and assigns risk scores
"""
from typing import Dict, List
from blockchain_service import get_blockchain_service

class RiskEngine:
    """
    Analyzes payment transactions for fraud patterns
    """
    
    # Risk thresholds
    HIGH_RISK_THRESHOLD = 70
    MEDIUM_RISK_THRESHOLD = 40
    
    # Vault delay times (seconds)
    HIGH_RISK_DELAY = 14400  # 4 hours (Strict "Veto" Window)
    MEDIUM_RISK_DELAY = 3600  # 1 hour
    
    def __init__(self):
        self.blockchain = get_blockchain_service()
    
    def analyze_transfer(self, sender: str, recipient: str, amount: float) -> Dict:
        """
        Main analysis function
        Returns risk assessment with score, level, and reasons
        """
        score = 0
        reasons = []
        patterns_detected = []
        
        # Get recipient wallet profile
        recipient_profile = self.blockchain.get_wallet_profile(recipient)
        
        # Pattern 1: Fresh Wallet Detection
        tx_count = recipient_profile.get("transaction_count", 0)
        if tx_count < 5:
            score += 35
            reasons.append(f"Recipient is a fresh wallet ({tx_count} transactions)")
            patterns_detected.append("FRESH_WALLET")
        elif tx_count < 20:
            score += 20
            reasons.append(f"Recipient has limited history ({tx_count} transactions)")
        
        # Pattern 2: Penny Drop Detection
        if recipient_profile.get("has_recent_small_tx", False):
            score += 75  # Critical Red Flag
            reasons.append("CRITICAL: Penny Drop pattern (small test tx) detected")
            patterns_detected.append("PENNY_DROP")
        
        # Pattern 3: Wallet Age Check
        wallet_age = recipient_profile.get("wallet_age_days", 0)
        if wallet_age < 7:
            score += 25
            reasons.append(f"Very new wallet (created ~{wallet_age} days ago)")
            patterns_detected.append("NEW_WALLET")
        elif wallet_age < 30:
            score += 10
            reasons.append(f"Recently created wallet (~{wallet_age} days ago)")
        
        # Pattern 4: Contract Address Check
        if recipient_profile.get("is_contract", False):
            score += 15
            reasons.append("Recipient is a smart contract (verify legitimacy)")
            patterns_detected.append("CONTRACT_RECIPIENT")
        
        # Pattern 5: Zero Balance Wallet
        balance = recipient_profile.get("balance_eth", 0)
        if balance == 0 and tx_count > 0:
            score += 20
            reasons.append("Wallet has zero balance despite transaction history")
            patterns_detected.append("ZERO_BALANCE")
        
        # Determine risk level
        if score >= self.HIGH_RISK_THRESHOLD:
            risk_level = "HIGH"
            vault_delay = self.HIGH_RISK_DELAY
            recommended_action = "VAULT_LOCK"
        elif score >= self.MEDIUM_RISK_THRESHOLD:
            risk_level = "MEDIUM"
            vault_delay = self.MEDIUM_RISK_DELAY
            recommended_action = "VAULT_LOCK"
        else:
            risk_level = "LOW"
            vault_delay = 0
            recommended_action = "INSTANT_SEND"
        
        return {
            "risk_score": score,
            "risk_level": risk_level,
            "vault_delay_seconds": vault_delay,
            "recommended_action": recommended_action,
            "reasons": reasons,
            "patterns_detected": patterns_detected,
            "recipient_profile": {
                "address": recipient,
                "transaction_count": tx_count,
                "wallet_age_days": wallet_age,
                "balance_eth": balance
            }
        }
    
    def get_scam_explanation(self, patterns: List[str]) -> str:
        """
        Get human-readable explanation of detected scam patterns
        """
        explanations = {
            "PENNY_DROP": "This looks like a 'Penny Drop' scam where fraudsters send a small test payment first, then request a large sum claiming it was a mistake.",
            "FRESH_WALLET": "The recipient wallet is brand new with very few transactions, which is common in scam operations that create disposable wallets.",
            "NEW_WALLET": "This wallet was created very recently, which increases risk as scammers often use new wallets.",
            "CONTRACT_RECIPIENT": "You're sending to a smart contract. Make sure you trust this contract's code.",
            "ZERO_BALANCE": "This wallet has transaction history but zero balance, suggesting funds are immediately moved elsewhere."
        }
        
        if not patterns:
            return "No specific scam patterns detected."
        
        return " ".join([explanations.get(p, "") for p in patterns])

# Singleton instance
_risk_engine = None

def get_risk_engine() -> RiskEngine:
    """Get or create risk engine instance"""
    global _risk_engine
    if _risk_engine is None:
        _risk_engine = RiskEngine()
    return _risk_engine
