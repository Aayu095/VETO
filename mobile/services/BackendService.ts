/**
 * Backend API Service - Connect to VETO Risk Engine
 */
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Change to your backend URL

export interface RiskAssessment {
    risk_score: number;
    risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
    vault_delay_seconds: number;
    recommended_action: 'INSTANT_SEND' | 'VAULT_LOCK';
    reasons: string[];
    patterns_detected: string[];
    scam_explanation: string;
    recipient_profile: {
        address: string;
        transaction_count: number;
        wallet_age_days: number;
        balance_eth: number;
    };
}

export class BackendService {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    /**
     * Analyze a transfer for risk
     */
    async analyzeTransfer(
        sender: string,
        recipient: string,
        amount: number
    ): Promise<RiskAssessment> {
        try {
            const response = await axios.post<RiskAssessment>(
                `${this.baseUrl}/api/analyze-transfer`,
                { sender, recipient, amount },
                { timeout: 10000 }
            );
            return response.data;
        } catch (error) {
            console.error('Risk analysis failed:', error);
            // Return safe default if backend is down
            return {
                risk_score: 0,
                risk_level: 'LOW',
                vault_delay_seconds: 0,
                recommended_action: 'INSTANT_SEND',
                reasons: ['Backend unavailable - proceeding with caution'],
                patterns_detected: [],
                scam_explanation: 'Unable to perform risk analysis',
                recipient_profile: {
                    address: recipient,
                    transaction_count: 0,
                    wallet_age_days: 0,
                    balance_eth: 0
                }
            };
        }
    }

    /**
     * Get vault status for an address
     */
    async getVaultStatus(address: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/api/vault-status/${address}`
            );
            return response.data;
        } catch (error) {
            console.error('Failed to get vault status:', error);
            return null;
        }
    }

    /**
     * Health check
     */
    async healthCheck(): Promise<boolean> {
        try {
            const response = await axios.get(`${this.baseUrl}/health`, {
                timeout: 5000
            });
            return response.data.status === 'healthy';
        } catch (error) {
            return false;
        }
    }
}

export const backendService = new BackendService();
