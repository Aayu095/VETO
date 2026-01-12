// MNEE Token ABI (ERC-20 Standard)
export const MNEE_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() view returns (string)"
];

// VetoVault Contract ABI
export const VETO_VAULT_ABI = [
    "function depositForTransfer(address recipient, uint256 amount, uint256 delaySeconds) returns (uint256)",
    "function recallFunds(uint256 transactionId) returns (bool)",
    "function releaseFunds(uint256 transactionId) returns (bool)",
    "function getTransaction(uint256 transactionId) view returns (address sender, address recipient, uint256 amount, uint256 releaseTime, bool recalled, bool released)",
    "function getUserTransactions(address user) view returns (uint256[])",
    "event FundsDeposited(uint256 indexed transactionId, address indexed sender, address indexed recipient, uint256 amount, uint256 releaseTime)",
    "event FundsRecalled(uint256 indexed transactionId)",
    "event FundsReleased(uint256 indexed transactionId)"
];

// Contract Addresses
export const CONTRACTS = {
    MNEE_TOKEN: "0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF",
    VETO_VAULT: "", // Will be filled after deployment
    SEPOLIA_RPC: "https://sepolia.infura.io/v3/YOUR_KEY"
};
