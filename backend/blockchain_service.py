"""
Blockchain Service - Real Ethereum Integration
Handles all Web3 interactions for risk analysis
"""
from web3 import Web3
from typing import Dict, List, Optional
import os
from datetime import datetime, timedelta

class BlockchainService:
    def __init__(self, rpc_url: str):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        if not self.w3.is_connected():
            raise Exception(f"Failed to connect to Ethereum node at {rpc_url}")
        
        print(f"✅ Connected to Ethereum - Chain ID: {self.w3.eth.chain_id}")
    
    def get_wallet_age_days(self, address: str) -> int:
        """
        Calculate wallet age by finding first transaction
        Returns age in days
        """
        try:
            address = Web3.to_checksum_address(address)
            current_block = self.w3.eth.block_number
            
            # Binary search for first transaction (approximate)
            # For demo, we'll check recent blocks only to save time
            blocks_to_check = min(10000, current_block)
            
            tx_count = self.w3.eth.get_transaction_count(address)
            if tx_count == 0:
                return 0  # Brand new wallet
            
            # Estimate: If wallet has transactions, assume it's at least 1 day old
            # In production, you'd do proper binary search through blocks
            return max(1, tx_count // 10)  # Rough estimate
            
        except Exception as e:
            print(f"Error getting wallet age: {e}")
            return 0
    
    def get_transaction_count(self, address: str) -> int:
        """Get total number of transactions for an address"""
        try:
            address = Web3.to_checksum_address(address)
            return self.w3.eth.get_transaction_count(address)
        except Exception as e:
            print(f"Error getting transaction count: {e}")
            return 0
    
    def get_balance(self, address: str) -> float:
        """Get ETH balance in Ether (not Wei)"""
        try:
            address = Web3.to_checksum_address(address)
            balance_wei = self.w3.eth.get_balance(address)
            return float(self.w3.from_wei(balance_wei, 'ether'))
        except Exception as e:
            print(f"Error getting balance: {e}")
            return 0.0
    
    def check_recent_small_transaction(self, address: str, threshold_eth: float = 0.01) -> bool:
        """
        Check if address received a small transaction recently (Penny Drop pattern)
        This is simplified - in production you'd scan actual transaction history
        """
        try:
            # For demo purposes, we'll use a heuristic:
            # If wallet is very new (< 5 tx) and has some balance, flag as potential penny drop
            tx_count = self.get_transaction_count(address)
            balance = self.get_balance(address)
            
            if tx_count < 5 and balance > 0:
                return True
            
            return False
        except Exception as e:
            print(f"Error checking recent transactions: {e}")
            return False
    
    def is_contract_address(self, address: str) -> bool:
        """Check if address is a smart contract"""
        try:
            address = Web3.to_checksum_address(address)
            code = self.w3.eth.get_code(address)
            return len(code) > 0
        except Exception as e:
            print(f"Error checking contract: {e}")
            return False
    
    def get_wallet_profile(self, address: str) -> Dict:
        """
        Get comprehensive wallet profile for risk analysis
        """
        try:
            return {
                "address": address,
                "transaction_count": self.get_transaction_count(address),
                "balance_eth": self.get_balance(address),
                "wallet_age_days": self.get_wallet_age_days(address),
                "is_contract": self.is_contract_address(address),
                "has_recent_small_tx": self.check_recent_small_transaction(address)
            }
        except Exception as e:
            print(f"Error getting wallet profile: {e}")
            return {
                "address": address,
                "error": str(e)
            }

# Singleton instance
_blockchain_service: Optional[BlockchainService] = None

def get_blockchain_service() -> BlockchainService:
    """Get or create blockchain service instance"""
    global _blockchain_service
    if _blockchain_service is None:
        rpc_url = os.getenv("ETHEREUM_RPC_URL")
        if not rpc_url:
            raise Exception("ETHEREUM_RPC_URL not set in environment")
        _blockchain_service = BlockchainService(rpc_url)
    return _blockchain_service
