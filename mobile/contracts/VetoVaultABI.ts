export const VETO_VAULT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "txId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "unlockTime", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "reason", "type": "string" }
        ],
        "name": "FundsLocked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "txId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "FundsRecalled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "txId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "FundsReleased",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_receiver", "type": "address" },
            { "internalType": "uint256", "name": "_amount", "type": "uint256" },
            { "internalType": "uint256", "name": "_delaySeconds", "type": "uint256" },
            { "internalType": "string", "name": "_reason", "type": "string" }
        ],
        "name": "depositForTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_txId", "type": "uint256" }
        ],
        "name": "recallFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_txId", "type": "uint256" }
        ],
        "name": "releaseFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_txId", "type": "uint256" }
        ],
        "name": "getTransaction",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "address", "name": "sender", "type": "address" },
                    { "internalType": "address", "name": "receiver", "type": "address" },
                    { "internalType": "uint256", "name": "amount", "type": "uint256" },
                    { "internalType": "uint256", "name": "unlockTime", "type": "uint256" },
                    { "internalType": "enum VetoVault.TxStatus", "name": "status", "type": "uint8" },
                    { "internalType": "string", "name": "reason", "type": "string" }
                ],
                "internalType": "struct VetoVault.VaultTransaction",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_user", "type": "address" }
        ],
        "name": "getUserTransactions",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "address", "name": "sender", "type": "address" },
                    { "internalType": "address", "name": "receiver", "type": "address" },
                    { "internalType": "uint256", "name": "amount", "type": "uint256" },
                    { "internalType": "uint256", "name": "unlockTime", "type": "uint256" },
                    { "internalType": "enum VetoVault.TxStatus", "name": "status", "type": "uint8" },
                    { "internalType": "string", "name": "reason", "type": "string" }
                ],
                "internalType": "struct VetoVault.VaultTransaction[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Placeholder Addresses (Replace after real deployment)
export const VETO_VAULT_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MNEE_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";
