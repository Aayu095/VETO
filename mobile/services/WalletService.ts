/**
 * Wallet Service - Manages Ethereum wallet and private keys
 */
import * as SecureStore from 'expo-secure-store';
import { ethers } from 'ethers';

const WALLET_KEY = 'veto_wallet_private_key';

export class WalletService {
    private wallet: ethers.Wallet | null = null;
    private provider: ethers.JsonRpcProvider;

    constructor(rpcUrl: string) {
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
    }

    /**
     * Create a new wallet
     */
    async createWallet(): Promise<string> {
        const wallet = ethers.Wallet.createRandom();
        await SecureStore.setItemAsync(WALLET_KEY, wallet.privateKey);
        this.wallet = wallet.connect(this.provider);
        return wallet.address;
    }

    /**
     * Import wallet from private key
     */
    async importWallet(privateKey: string): Promise<string> {
        const wallet = new ethers.Wallet(privateKey);
        await SecureStore.setItemAsync(WALLET_KEY, privateKey);
        this.wallet = wallet.connect(this.provider);
        return wallet.address;
    }

    /**
     * Load existing wallet
     */
    async loadWallet(): Promise<string | null> {
        const privateKey = await SecureStore.getItemAsync(WALLET_KEY);
        if (!privateKey) return null;

        const wallet = new ethers.Wallet(privateKey);
        this.wallet = wallet.connect(this.provider);
        return wallet.address;
    }

    /**
     * Get wallet address
     */
    getAddress(): string | null {
        return this.wallet?.address || null;
    }

    /**
     * Get ETH balance
     */
    async getEthBalance(): Promise<string> {
        if (!this.wallet) throw new Error('Wallet not loaded');
        const balance = await this.provider.getBalance(this.wallet.address);
        return ethers.formatEther(balance);
    }

    /**
     * Get connected wallet instance
     */
    getWallet(): ethers.Wallet {
        if (!this.wallet) throw new Error('Wallet not loaded');
        return this.wallet;
    }

    /**
     * Sign a transaction
     */
    async signTransaction(tx: ethers.TransactionRequest): Promise<string> {
        if (!this.wallet) throw new Error('Wallet not loaded');
        return await this.wallet.signTransaction(tx);
    }

    /**
     * Clear wallet (logout)
     */
    async clearWallet(): Promise<void> {
        await SecureStore.deleteItemAsync(WALLET_KEY);
        this.wallet = null;
    }
}

// Singleton instance
let walletService: WalletService | null = null;

export function getWalletService(rpcUrl?: string): WalletService {
    if (!walletService) {
        if (!rpcUrl) throw new Error('RPC URL required for first initialization');
        walletService = new WalletService(rpcUrl);
    }
    return walletService;
}
