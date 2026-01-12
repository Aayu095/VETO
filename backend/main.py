"""
VETO Risk Engine API - Production Version
Real blockchain integration for APP fraud prevention
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import our services
try:
    from fraud_agent import get_fraud_agent
    from blockchain_service import get_blockchain_service
    BLOCKCHAIN_AVAILABLE = True
except Exception as e:
    print(f"⚠️ Blockchain services not available: {e}")
    BLOCKCHAIN_AVAILABLE = False

app = FastAPI(
    title="VETO Risk Engine API",
    description="AI-powered fraud detection for MNEE payments",
    version="1.0.0"
)

# CORS middleware for web/mobile access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# Models
# ============================================

class TransferRequest(BaseModel):
    sender: str
    recipient: str
    amount: float

class RiskAssessment(BaseModel):
    risk_score: int
    risk_level: str  # "LOW", "MEDIUM", "HIGH"
    vault_delay_seconds: int
    recommended_action: str  # "INSTANT_SEND" or "VAULT_LOCK"
    reasons: List[str]
    patterns_detected: List[str]
    scam_explanation: str
    recipient_profile: dict

class VaultStatusResponse(BaseModel):
    address: str
    total_protected_usd: float
    scams_prevented: int
    active_locks: int

# ============================================
# Startup Event
# ============================================

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    if BLOCKCHAIN_AVAILABLE:
        try:
            # Test blockchain connection
            blockchain = get_blockchain_service()
            print(f"✅ Backend started successfully")
            print(f"✅ Connected to Ethereum network")
        except Exception as e:
            print(f"⚠️ Warning: Could not connect to blockchain: {e}")
            print(f"⚠️ API will run in degraded mode")
    else:
        print(f"⚠️ Running without blockchain integration")

# ============================================
# API Routes
# ============================================

@app.get("/")
def read_root():
    """Health check endpoint"""
    return {
        "message": "VETO Risk Engine API",
        "status": "operational",
        "version": "1.0.0",
        "blockchain_enabled": BLOCKCHAIN_AVAILABLE
    }

@app.get("/health")
def health_check():
    """Detailed health check"""
    if not BLOCKCHAIN_AVAILABLE:
        return {
            "status": "degraded",
            "blockchain_connected": False,
            "error": "Blockchain services not initialized"
        }
    
    try:
        blockchain = get_blockchain_service()
        chain_id = blockchain.w3.eth.chain_id
        block_number = blockchain.w3.eth.block_number
        
        return {
            "status": "healthy",
            "blockchain_connected": True,
            "chain_id": chain_id,
            "latest_block": block_number
        }
    except Exception as e:
        return {
            "status": "degraded",
            "blockchain_connected": False,
            "error": str(e)
        }

@app.post("/api/analyze-transfer", response_model=RiskAssessment)
def analyze_transfer(request: TransferRequest):
    """
    Analyze a proposed transfer for fraud risk using AI Agent
    """
    if not BLOCKCHAIN_AVAILABLE:
        # Fallback to mock analysis
        return _mock_analysis(request)
    
    try:
        # Get AI fraud detection agent
        agent = get_fraud_agent()
        
        # Perform AI-powered analysis
        assessment = agent.analyze_transaction(
            sender=request.sender,
            recipient=request.recipient,
            amount=request.amount
        )
        
        return assessment
        
    except Exception as e:
        print(f"Error in AI agent analysis: {e}")
        # Fallback to mock
        return _mock_analysis(request)

def _mock_analysis(request: TransferRequest) -> RiskAssessment:
    """Fallback mock analysis when blockchain not available"""
    score = 0
    reasons = []
    patterns = []
    
    # Simple mock logic
    if request.recipient.endswith("9e"):
        score = 85
        reasons.append("Potential scam pattern detected (demo mode)")
        patterns.append("PENNY_DROP")
    
    risk_level = "HIGH" if score > 70 else "MEDIUM" if score > 40 else "LOW"
    
    return RiskAssessment(
        risk_score=score,
        risk_level=risk_level,
        vault_delay_seconds=3600 if risk_level == "HIGH" else 0,
        recommended_action="VAULT_LOCK" if risk_level != "LOW" else "INSTANT_SEND",
        reasons=reasons,
        patterns_detected=patterns,
        scam_explanation="Running in demo mode without blockchain connection",
        recipient_profile={
            "address": request.recipient,
            "transaction_count": 0,
            "wallet_age_days": 0,
            "balance_eth": 0
        }
    )

@app.get("/api/vault-status/{address}", response_model=VaultStatusResponse)
def get_vault_status(address: str):
    """
    Get vault protection status for an address
    This would query the VetoVault contract in production
    """
    try:
        # For now, return mock data
        # In production, query VetoVault contract for active deposits
        return VaultStatusResponse(
            address=address,
            total_protected_usd=0.0,
            scams_prevented=0,
            active_locks=0
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get vault status: {str(e)}"
        )

@app.get("/api/wallet-profile/{address}")
def get_wallet_profile(address: str):
    """
    Get detailed wallet profile for risk analysis
    """
    if not BLOCKCHAIN_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="Blockchain services not available"
        )
    
    try:
        blockchain = get_blockchain_service()
        profile = blockchain.get_wallet_profile(address)
        return profile
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get wallet profile: {str(e)}"
        )

# ============================================
# Run Server
# ============================================

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
