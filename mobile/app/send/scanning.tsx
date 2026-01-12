import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Shield, Search, Brain, ChartBar, CheckCircle, AlertTriangle, XCircle } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { verifyTransaction, AIVerificationResult } from '../../services/aiVerification';

export default function ScanningScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { scannedData, address, amount } = useLocalSearchParams<{
        scannedData?: string;
        address?: string;
        amount?: string;
    }>();

    const [progress, setProgress] = useState(0);
    const [verificationResult, setVerificationResult] = useState<AIVerificationResult | null>(null);
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        performVerification();
    }, []);

    const performVerification = async () => {
        // Animate progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        try {
            // Call AI verification service
            const result = await verifyTransaction(
                address || scannedData || '',
                amount
            );

            setProgress(100);
            setVerificationResult(result);
            setIsVerifying(false);
        } catch (error) {
            console.error('Verification failed:', error);
            setIsVerifying(false);
        }
    };

    const getRiskColor = () => {
        if (!verificationResult) return theme.primary;
        switch (verificationResult.riskLevel) {
            case 'safe': return theme.success;
            case 'warning': return theme.warning;
            case 'danger': return theme.danger;
            default: return theme.primary;
        }
    };

    const getRiskIcon = () => {
        if (!verificationResult) return <Shield size={120} color={theme.primary} />;
        switch (verificationResult.riskLevel) {
            case 'safe': return <CheckCircle size={120} color={theme.success} />;
            case 'warning': return <AlertTriangle size={120} color={theme.warning} />;
            case 'danger': return <XCircle size={120} color={theme.danger} />;
            default: return <Shield size={120} color={theme.primary} />;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'bottom']}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
                {/* Icon */}
                <View style={{ marginBottom: 32 }}>
                    {getRiskIcon()}
                </View>

                {/* Loading Indicator */}
                {isVerifying && (
                    <ActivityIndicator size="large" color={theme.primary} style={{ marginBottom: 24 }} />
                )}

                {/* Status Text */}
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.textPrimary, marginBottom: 8, textAlign: 'center' }}>
                    {isVerifying ? 'AI Agent Scanning...' : verificationResult?.riskLevel.toUpperCase()}
                </Text>
                <Text style={{ fontSize: 16, color: theme.textSecondary, marginBottom: 32, textAlign: 'center' }}>
                    {isVerifying
                        ? 'Analyzing transaction for fraud patterns'
                        : verificationResult?.recommendation
                    }
                </Text>

                {/* Progress */}
                {isVerifying && (
                    <View style={{ width: '100%', marginBottom: 40 }}>
                        <View style={{ width: '100%', height: 8, backgroundColor: theme.backgroundSecondary, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
                            <View style={{ width: `${progress}%`, height: '100%', backgroundColor: theme.primary, borderRadius: 4 }} />
                        </View>
                        <Text style={{ fontSize: 14, color: theme.textTertiary, textAlign: 'center' }}>{progress}%</Text>
                    </View>
                )}

                {/* Scanning Steps */}
                <View style={{ width: '100%' }}>
                    <ScanStep
                        icon={<Search size={24} color={theme.textTertiary} />}
                        activeIcon={<Search size={24} color={theme.textPrimary} />}
                        text="Checking recipient wallet history"
                        active={progress >= 20}
                        theme={theme}
                    />
                    <ScanStep
                        icon={<Brain size={24} color={theme.textTertiary} />}
                        activeIcon={<Brain size={24} color={theme.textPrimary} />}
                        text="Detecting fraud patterns"
                        active={progress >= 40}
                        theme={theme}
                    />
                    <ScanStep
                        icon={<ChartBar size={24} color={theme.textTertiary} />}
                        activeIcon={<ChartBar size={24} color={theme.textPrimary} />}
                        text="Calculating risk score"
                        active={progress >= 60}
                        theme={theme}
                    />
                    <ScanStep
                        icon={<CheckCircle size={24} color={theme.textTertiary} />}
                        activeIcon={<CheckCircle size={24} color={theme.textPrimary} />}
                        text="Generating recommendation"
                        active={progress >= 80}
                        theme={theme}
                    />
                </View>

                {/* Action Buttons */}
                {!isVerifying && verificationResult && (
                    <View style={{ width: '100%', gap: 12, marginTop: 32 }}>
                        {verificationResult.riskLevel === 'safe' && (
                            <TouchableOpacity
                                style={{ backgroundColor: theme.success, paddingVertical: 16, borderRadius: 12, alignItems: 'center' }}
                                onPress={() => router.replace({
                                    pathname: '/send/amount',
                                    params: {
                                        address: verificationResult.walletAddress,
                                        name: 'Recipient'
                                    }
                                })}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Continue to Send</Text>
                            </TouchableOpacity>
                        )}

                        {verificationResult.riskLevel === 'warning' && (
                            <>
                                <TouchableOpacity
                                    style={{ backgroundColor: theme.warning, paddingVertical: 16, borderRadius: 12, alignItems: 'center' }}
                                    onPress={() => router.replace({
                                        pathname: '/send/review',
                                        params: {
                                            address: verificationResult.walletAddress,
                                            amount: verificationResult.amount || ''
                                        }
                                    })}
                                >
                                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Proceed Anyway</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: theme.backgroundSecondary, borderWidth: 1, borderColor: theme.border, paddingVertical: 16, borderRadius: 12, alignItems: 'center' }}
                                    onPress={() => router.back()}
                                >
                                    <Text style={{ color: theme.textPrimary, fontSize: 18, fontWeight: 'bold' }}>Cancel</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {verificationResult.riskLevel === 'danger' && (
                            <TouchableOpacity
                                style={{ backgroundColor: theme.danger, paddingVertical: 16, borderRadius: 12, alignItems: 'center' }}
                                onPress={() => router.back()}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Cancel Transaction</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

function ScanStep({ icon, activeIcon, text, active, theme }: { icon: React.ReactNode; activeIcon: React.ReactNode; text: string; active: boolean; theme: any }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: active ? theme.backgroundSecondary : 'transparent', borderRadius: 12, marginBottom: 8, opacity: active ? 1 : 0.5 }}>
            <View style={{ marginRight: 12 }}>
                {active ? activeIcon : icon}
            </View>
            <Text style={{ flex: 1, fontSize: 14, color: active ? theme.textPrimary : theme.textTertiary, fontWeight: active ? '500' : 'normal' }}>{text}</Text>
            {active && <CheckCircle size={20} color={theme.success} />}
        </View>
    );
}
