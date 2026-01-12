import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/theme';

export default function ConfirmationScreen() {
    const router = useRouter();
    const { name, address, amount } = useLocalSearchParams();
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';

    const [status, setStatus] = useState<'processing' | 'success'>('processing');
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Simulate transaction processing
        setTimeout(() => {
            setStatus('success');

            // Animate success icon
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 1500);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
            <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 60 }}>
                {status === 'processing' ? (
                    <>
                        {/* Processing State */}
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: theme.primary + '20', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: theme.primary + '40', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.primary }} />
                                </View>
                            </View>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.textPrimary, marginBottom: 12 }}>Processing Transaction</Text>
                            <Text style={{ fontSize: 16, color: theme.textSecondary, textAlign: 'center', lineHeight: 24 }}>
                                Please wait while we securely process{'\n'}your transaction...
                            </Text>
                        </View>
                    </>
                ) : (
                    <>
                        {/* Success State */}
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: fadeAnim, marginBottom: 32 }}>
                                <CheckCircle size={120} color={Colors.risk.safe} strokeWidth={2} />
                            </Animated.View>

                            <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                                <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.textPrimary, marginBottom: 12 }}>Transaction Sent!</Text>
                                <Text style={{ fontSize: 16, color: theme.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: 40 }}>
                                    Your payment has been successfully{'\n'}sent to the recipient
                                </Text>

                                {/* Transaction Details Card */}
                                <View style={{ width: '100%', backgroundColor: theme.card, borderRadius: 20, padding: 20, marginBottom: 32, borderWidth: 1, borderColor: theme.border }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                                        <Text style={{ fontSize: 14, color: theme.textSecondary }}>Amount Sent</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.risk.safe }}>{Array.isArray(amount) ? amount[0] : amount} MNEE</Text>
                                    </View>
                                    <View style={{ height: 1, backgroundColor: theme.border, marginBottom: 16 }} />
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, color: theme.textSecondary }}>To</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textPrimary }}>{String(name)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, color: theme.textSecondary }}>Address</Text>
                                        <Text style={{ fontSize: 12, fontFamily: 'monospace', color: theme.textSecondary }}>{String(address).slice(0, 12)}...</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 14, color: theme.textSecondary }}>Status</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.risk.safe }} />
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.risk.safe }}>Completed</Text>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>
                        </View>

                        {/* Action Buttons */}
                        <View style={{ paddingBottom: 40 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: theme.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 12 }}
                                onPress={() => router.push('/(tabs)')}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Done</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
                                onPress={() => {
                                    // Navigate to activity/transaction details
                                    router.push('/activity');
                                }}
                            >
                                <Text style={{ color: theme.textSecondary, fontSize: 16, fontWeight: '600' }}>View Transaction Details</Text>
                                <ArrowRight size={20} color={theme.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}
