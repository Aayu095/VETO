// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Interface for the MNEE Stablecoin (Standard ERC20)
interface IMNEE is IERC20 {}

contract VetoVault is ReentrancyGuard, Ownable {
    
    // The MNEE Token Contract
    IMNEE public immutable mneeToken;

    enum TxStatus { PENDING, RELEASED, RECALLED }

    struct VaultTransaction {
        uint256 id;
        address sender;
        address receiver;
        uint256 amount;
        uint256 unlockTime;
        TxStatus status;
        string reason; // Risk reason (e.g., "Penny Drop Detected")
    }

    uint256 public nextTxId;
    mapping(uint256 => VaultTransaction) public transactions;
    
    // Mapping to track user's active vault transactions
    mapping(address => uint256[]) public userTransactions;

    event FundsLocked(uint256 indexed txId, address indexed sender, address indexed receiver, uint256 amount, uint256 unlockTime, string reason);
    event FundsReleased(uint256 indexed txId, address indexed receiver, uint256 amount);
    event FundsRecalled(uint256 indexed txId, address indexed sender, uint256 amount);

    constructor(address _mneeTokenAddress) Ownable(msg.sender) {
        // MNEE Mainnet: 0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF
        // For testing, use Sepolia testnet MNEE address
        mneeToken = IMNEE(_mneeTokenAddress);
    }

    /**
     * @dev Initiates a Secure Transfer (Moves funds to Vault).
     * @param _receiver The intended recipient.
     * @param _amount The amount of MNEE.
     * @param _delaySeconds How long to lock the funds (e.g., 3600 for 1 hour).
     * @param _reason The AI's reason for flagging this (for UI display).
     */
    function depositForTransfer(
        address _receiver, 
        uint256 _amount, 
        uint256 _delaySeconds,
        string memory _reason
    ) external nonReentrant {
        require(_amount > 0, "Amount must be > 0");
        require(_receiver != address(0), "Invalid receiver");

        // Transfer MNEE from User to Vault
        // User must have approved this contract first!
        bool success = mneeToken.transferFrom(msg.sender, address(this), _amount);
        require(success, "MNEE Transfer failed");

        uint256 txId = nextTxId++;
        uint256 unlockTime = block.timestamp + _delaySeconds;

        transactions[txId] = VaultTransaction({
            id: txId,
            sender: msg.sender,
            receiver: _receiver,
            amount: _amount,
            unlockTime: unlockTime,
            status: TxStatus.PENDING,
            reason: _reason
        });

        userTransactions[msg.sender].push(txId);

        emit FundsLocked(txId, msg.sender, _receiver, _amount, unlockTime, _reason);
    }

    /**
     * @dev THE VETO: Emergency Undo by the Sender.
     * Can only be called BEFORE the unlockTime.
     */
    function recallFunds(uint256 _txId) external nonReentrant {
        VaultTransaction storage txn = transactions[_txId];
        
        require(msg.sender == txn.sender, "Not the sender");
        require(txn.status == TxStatus.PENDING, "Transaction not pending");
        require(block.timestamp < txn.unlockTime, "Too late to recall");

        txn.status = TxStatus.RECALLED;

        // Refund the Sender
        bool success = mneeToken.transfer(txn.sender, txn.amount);
        require(success, "Refund failed");

        emit FundsRecalled(_txId, txn.sender, txn.amount);
    }

    /**
     * @dev Release funds to the Receiver.
     * Can be called by ANYONE after the unlockTime (usually the receiver or a keeper).
     */
    function releaseFunds(uint256 _txId) external nonReentrant {
        VaultTransaction storage txn = transactions[_txId];

        require(txn.status == TxStatus.PENDING, "Transaction not pending");
        require(block.timestamp >= txn.unlockTime, "Funds are still locked");

        txn.status = TxStatus.RELEASED;

        // Transfer to Receiver
        bool success = mneeToken.transfer(txn.receiver, txn.amount);
        require(success, "Release failed");

        emit FundsReleased(_txId, txn.receiver, txn.amount);
    }

    // View Functions
    function getTransaction(uint256 _txId) external view returns (VaultTransaction memory) {
        return transactions[_txId];
    }

    function getUserTransactions(address _user) external view returns (VaultTransaction[] memory) {
        uint256[] memory txIds = userTransactions[_user];
        VaultTransaction[] memory txs = new VaultTransaction[](txIds.length);
        
        for (uint256 i = 0; i < txIds.length; i++) {
            txs[i] = transactions[txIds[i]];
        }
        return txs;
    }
}
