import { View, Text, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, ScanLine } from 'lucide-react-native';
import { backendService } from '../../../services/BackendService';
import { getWalletService } from '../../../services/WalletService';
import { CONTRACTS } from '../../../contracts/abis';
import { BlurView } from 'expo-blur';

const StyledSafeArea = styled(SafeAreaView);

export default function SendScreen() {
    const router = useRouter();
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!address || !amount) return;

        setLoading(true);

        try {
            const walletService = getWalletService(CONTRACTS.SEPOLIA_RPC);
            const senderAddress = walletService.getAddress() || '0x0000000000000000000000000000000000000000';

            const assessment = await backendService.analyzeTransfer(
                senderAddress,
                address,
                parseFloat(amount)
            );

            setLoading(false);

            router.push({
                pathname: '/(tabs)/send/review',
                params: {
                    address,
                    amount,
                    riskLevel: assessment.risk_level,
                    riskScore: assessment.risk_score.toString(),
                    reasons: JSON.stringify(assessment.reasons),
                    patterns: JSON.stringify(assessment.patterns_detected),
                    explanation: assessment.scam_explanation,
                    vaultDelay: assessment.vault_delay_seconds.toString()
                }
            });

        } catch (error) {
            setLoading(false);
            console.error('Analysis error:', error);
            // In a real app, show error toast here
        }
    };

    return (
        <StyledSafeArea className="flex-1 bg-[#050505]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                {/* Header */}
                <View className="px-6 py-4 flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center rounded-full bg-white/5 active:bg-white/10"
                    >
                        <ArrowLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text className="text-white/60 font-medium text-sm tracking-widest">SEND MNEE</Text>
                    <View className="w-10" /> {/* Spacer for alignment */}
                </View>

                {/* Main Content */}
                <View className="flex-1 px-8 justify-center min-h-[400px]">

                    {/* Giant Amount Input */}
                    <View className="items-center mb-16">
                        <View className="flex-row items-end">
                            <TextInput
                                className="text-7xl font-bold text-white text-center min-w-[80px]"
                                placeholder="0"
                                placeholderTextColor="#333"
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                                autoFocus
                                selectionColor="#2563EB"
                            />
                        </View>
                        <Text className="text-slate-500 text-lg font-medium mt-2">
                            ≈ ${amount ? (parseFloat(amount) * 1.05).toFixed(2) : '0.00'} USD
                        </Text>
                    </View>

                    {/* Recipient Input - Floating Glass */}
                    <View className="relative">
                        <View className="absolute z-10 top-0 bottom-0 left-4 justify-center">
                            <Text className="text-slate-500 font-medium">To:</Text>
                        </View>
                        <TextInput
                            className="bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-12 text-white text-lg font-medium"
                            placeholder="Address, ENS, or Phone"
                            placeholderTextColor="#444"
                            value={address}
                            onChangeText={setAddress}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity className="absolute z-10 top-0 bottom-0 right-4 justify-center">
                            <ScanLine size={20} color="#2563EB" />
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Footer Action */}
                <View className="px-6 pb-8">
                    <TouchableOpacity
                        className={`w-full py-5 rounded-3xl items-center shadow-lg ${!amount || !address || loading
                                ? 'bg-slate-800'
                                : 'bg-blue-600 shadow-blue-600/30'
                            }`}
                        disabled={!amount || !address || loading}
                        onPress={handleContinue}
                    >
                        <Text className={`font-bold text-lg tracking-wide ${!amount || !address || loading ? 'text-slate-500' : 'text-white'
                            }`}>
                            {loading ? 'ANALYZING RISK...' : 'REVIEW TRANSFER'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </StyledSafeArea>
    );
}
