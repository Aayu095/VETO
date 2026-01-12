/**
 * MNEE Token Service - Interact with MNEE ERC-20 token
 */
import { ethers } from 'ethers';
import { MNEE_ABI, CONTRACTS } from '../contracts/abis';
import { WalletService } from './WalletService';

export class MNEEService {
    private contract: ethers.Contract;
    private wallet: WalletService;

    constructor(walletService: WalletService) {
        this.wallet = walletService;
        const signer = walletService.getWallet();
        this.contract = new ethers.Contract(
            CONTRACTS.MNEE_TOKEN,
            MNEE_ABI,
            signer
        );
    }

    /**
     * Get MNEE balance for current wallet
     */
    async getBalance(): Promise<string> {
        const address = this.wallet.getAddress();
        if (!address) throw new Error('No wallet loaded');

        const balance = await this.contract.balanceOf(address);
        return ethers.formatUnits(balance, 18); // MNEE has 18 decimals
    }

    /**
     * Transfer MNEE tokens
     */
    async transfer(to: string, amount: string): Promise<ethers.TransactionResponse> {
        const amountWei = ethers.parseUnits(amount, 18);
        const tx = await this.contract.transfer(to, amountWei);
        return tx;
    }

    /**
     * Approve VetoVault to spend MNEE
     */
    async approveVault(amount: string): Promise<ethers.TransactionResponse> {
        const amountWei = ethers.parseUnits(amount, 18);
        const tx = await this.contract.approve(CONTRACTS.VETO_VAULT, amountWei);
        return tx;
    }

    /**
     * Check allowance for VetoVault
     */
    async checkVaultAllowance(): Promise<string> {
        const address = this.wallet.getAddress();
        if (!address) throw new Error('No wallet loaded');

        const allowance = await this.contract.allowance(address, CONTRACTS.VETO_VAULT);
        return ethers.formatUnits(allowance, 18);
    }

    /**
     * Get token info
     */
    async getTokenInfo(): Promise<{ name: string; symbol: string; decimals: number }> {
        const [name, symbol, decimals] = await Promise.all([
            this.contract.name(),
            this.contract.symbol(),
            this.contract.decimals()
        ]);

        return { name, symbol, decimals: Number(decimals) };
    }
}
