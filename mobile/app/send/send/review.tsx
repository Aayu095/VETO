import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { styled } from 'nativewind';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';

const StyledSafeArea = styled(SafeAreaView);

export default function ReviewScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [scanning, setScanning] = useState(true);
    const [showResult, setShowResult] = useState(false);

    // Parse params
    const address = params.address as string;
    const amount = params.amount as string;
    const riskLevel = (params.riskLevel as string) || 'LOW';
    const riskScore = parseInt(params.riskScore as string) || 0;
    const reasons = JSON.parse((params.reasons as string) || '[]');
    const explanation = params.explanation as string;

    // Animation
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Pulse animation during scanning
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Simulate AI scanning
        setTimeout(() => {
            setScanning(false);
            setShowResult(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 3000);
    }, []);

    const handleProceed = () => {
        // In production, this would call the smart contract
        router.push('/(tabs)');
    };

    const handleCancel = () => {
        router.back();
    };

    // Scanning Screen
    if (scanning) {
        return (
            <StyledSafeArea className="flex-1 bg-slate-900">
                <View className="flex-1 items-center justify-center px-8">
                    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                        <View className="h-32 w-32 bg-blue-500 rounded-full items-center justify-center mb-8">
                            <Text className="text-6xl">🤖</Text>
                        </View>
                    </Animated.View>

                    <Text className="text-white text-2xl font-bold text-center mb-4">
                        AI Analyzing Transaction
                    </Text>
                    <Text className="text-slate-400 text-center text-base mb-8">
                        Scanning blockchain for fraud patterns...
                    </Text>

                    <ActivityIndicator size="large" color="#3B82F6" />
                </View>
            </StyledSafeArea>
        );
    }

    // HIGH RISK - VETO INTERVENTION
    if (riskLevel === 'HIGH') {
        return (
            <StyledSafeArea className="flex-1 bg-red-600">
                <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                    {/* Header */}
                    <View className="px-6 py-8 items-center border-b border-red-500">
                        <View className="h-24 w-24 bg-white rounded-full items-center justify-center mb-4">
                            <Text className="text-6xl">🛑</Text>
                        </View>
                        <Text className="text-white text-3xl font-extrabold text-center">
                            VETO INTERCEPTED
                        </Text>
                        <Text className="text-red-100 text-center mt-2">
                            High Risk Transaction Detected
                        </Text>
                    </View>

                    {/* Risk Details */}
                    <View className="flex-1 px-6 py-6">
                        <View className="bg-white/10 p-6 rounded-2xl mb-6">
                            <Text className="text-white font-bold text-lg mb-4">⚠️ Scam Patterns Detected:</Text>
                            {reasons.map((reason: string, idx: number) => (
                                <View key={idx} className="flex-row mb-3">
                                    <Text className="text-red-200 mr-2">•</Text>
                                    <Text className="text-red-100 flex-1">{reason}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="bg-white/10 p-6 rounded-2xl mb-6">
                            <Text className="text-white font-bold mb-2">Transaction Details:</Text>
                            <Text className="text-red-100 text-sm">To: {address.slice(0, 10)}...{address.slice(-8)}</Text>
                            <Text className="text-red-100 text-sm">Amount: {amount} MNEE</Text>
                            <Text className="text-red-100 text-sm">Risk Score: {riskScore}/100</Text>
                        </View>

                        <View className="bg-yellow-500/20 p-4 rounded-xl border border-yellow-500">
                            <Text className="text-yellow-200 text-sm font-bold">
                                💡 {explanation}
                            </Text>
                        </View>
                    </View>

                    {/* Actions */}
                    <View className="px-6 pb-8 space-y-4">
                        <TouchableOpacity
                            className="w-full bg-white py-5 rounded-2xl items-center shadow-lg"
                            onPress={handleCancel}
                        >
                            <Text className="font-extrabold text-red-600 text-lg">
                                ✓ CANCEL TRANSACTION (Recommended)
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-full bg-red-800 py-5 rounded-2xl items-center border-2 border-white/30"
                            onPress={handleProceed}
                        >
                            <Text className="font-bold text-white text-base">
                                Proceed Anyway (Lock in Vault for 1 Hour)
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </StyledSafeArea>
        );
    }

    // MEDIUM RISK - Warning
    if (riskLevel === 'MEDIUM') {
        return (
            <StyledSafeArea className="flex-1 bg-orange-500">
                <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                    <View className="px-6 py-8 items-center">
                        <View className="h-24 w-24 bg-white rounded-full items-center justify-center mb-4">
                            <Text className="text-6xl">⚠️</Text>
                        </View>
                        <Text className="text-white text-3xl font-extrabold text-center">
                            PROCEED WITH CAUTION
                        </Text>
                        <Text className="text-orange-100 text-center mt-2">
                            Medium Risk Detected
                        </Text>
                    </View>

                    <View className="flex-1 px-6">
                        <View className="bg-white p-6 rounded-2xl mb-6">
                            <Text className="font-bold text-orange-900 text-lg mb-4">Warnings:</Text>
                            {reasons.map((reason: string, idx: number) => (
                                <View key={idx} className="flex-row mb-3">
                                    <Text className="text-orange-600 mr-2">•</Text>
                                    <Text className="text-slate-700 flex-1">{reason}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="bg-white/90 p-6 rounded-2xl">
                            <Text className="font-bold text-slate-900 mb-2">Protection:</Text>
                            <Text className="text-slate-600">
                                This transaction will be locked in the VETO Vault for 30 minutes. You can recall it anytime during this period.
                            </Text>
                        </View>
                    </View>

                    <View className="px-6 pb-8 space-y-4">
                        <TouchableOpacity
                            className="w-full bg-white py-5 rounded-2xl items-center"
                            onPress={handleProceed}
                        >
                            <Text className="font-bold text-orange-600 text-lg">
                                Proceed with Vault Protection
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-full bg-orange-700 py-5 rounded-2xl items-center"
                            onPress={handleCancel}
                        >
                            <Text className="font-bold text-white text-base">
                                Cancel Transaction
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </StyledSafeArea>
        );
    }

    // LOW RISK - Safe to Send
    return (
        <StyledSafeArea className="flex-1 bg-emerald-500">
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <View className="flex-1 items-center justify-center px-8">
                    <View className="h-32 w-32 bg-white rounded-full items-center justify-center mb-8">
                        <Text className="text-7xl">✓</Text>
                    </View>

                    <Text className="text-white text-3xl font-extrabold text-center mb-4">
                        Safe to Send
                    </Text>
                    <Text className="text-emerald-100 text-center text-lg mb-8">
                        No fraud patterns detected
                    </Text>

                    <View className="bg-white/20 p-6 rounded-2xl w-full mb-8">
                        <Text className="text-white font-bold mb-2">Transaction:</Text>
                        <Text className="text-emerald-50">To: {address.slice(0, 10)}...{address.slice(-8)}</Text>
                        <Text className="text-emerald-50">Amount: {amount} MNEE</Text>
                    </View>
                </View>

                <View className="px-6 pb-8 space-y-4">
                    <TouchableOpacity
                        className="w-full bg-white py-5 rounded-2xl items-center shadow-lg"
                        onPress={handleProceed}
                    >
                        <Text className="font-extrabold text-emerald-600 text-lg">
                            Send Now
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-full bg-emerald-700 py-4 rounded-2xl items-center"
                        onPress={handleCancel}
                    >
                        <Text className="font-bold text-white">
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </StyledSafeArea>
    );
}
