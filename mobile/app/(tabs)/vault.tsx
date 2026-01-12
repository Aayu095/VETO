import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck, AlertTriangle, Clock, RotateCcw, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';

export default function VaultScreen() {
    const router = useRouter();
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';
    // TOGGLE THIS FOR DEMO: true = Transaction Locked, false = Empty/Safe
    const hasLockedFunds = true;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
                {/* Header */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.textPrimary }}>Veto Vault</Text>
                    <Text style={{ fontSize: 16, color: theme.textSecondary, marginTop: 4 }}>
                        {hasLockedFunds ? 'Review flagged transactions' : 'All transactions are secure'}
                    </Text>
                </View>

                {hasLockedFunds ? (
                    <View style={{ gap: 20 }}>
                        {/* Locked Transaction Card */}
                        <LinearGradient
                            colors={isDark ? ['#450a0a', '#7f1d1d'] : ['#FEE2E2', '#FECACA']}
                            style={{ borderRadius: 20, padding: 20, borderWidth: 2, borderColor: theme.danger, shadowColor: theme.danger, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 12 }}
                        >
                            {/* Header */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(153,27,27,0.2)' }}>
                                <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: isDark ? 'rgba(255,255,255,0.2)' : theme.danger }}>
                                    <Shield size={28} color={isDark ? '#FFFFFF' : theme.danger} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: isDark ? '#FFFFFF' : theme.danger, marginBottom: 2 }}>Transaction Blocked</Text>
                                    <Text style={{ fontSize: 13, color: isDark ? '#fca5a5' : '#991b1b', fontFamily: 'monospace' }}>ID: #8X92...99</Text>
                                </View>
                            </View>

                            {/* Details */}
                            <View style={{ gap: 12, marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: isDark ? '#fca5a5' : '#991b1b', fontWeight: '500' }}>Amount</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: isDark ? '#FFFFFF' : theme.danger }}>250 MNEE</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: isDark ? '#fca5a5' : '#991b1b', fontWeight: '500' }}>Recipient</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '600', color: isDark ? '#FFFFFF' : theme.danger, fontFamily: 'monospace' }}>0x7a9...9e</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: isDark ? '#fca5a5' : '#991b1b', fontWeight: '500' }}>Risk Level</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)' }}>
                                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.danger }} />
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: isDark ? '#FFFFFF' : theme.danger }}>HIGH (98%)</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Fraud Pattern */}
                            <View style={{ padding: 16, borderRadius: 12, backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <AlertTriangle size={16} color={isDark ? '#fca5a5' : theme.danger} />
                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: isDark ? '#FFFFFF' : theme.danger }}>Detected Pattern</Text>
                                </View>
                                <Text style={{ fontSize: 13, color: isDark ? '#fca5a5' : '#991b1b', lineHeight: 18 }}>
                                    Penny Drop Scam - Fresh wallet with suspicious activity
                                </Text>
                            </View>

                            {/* Countdown Timer */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
                                <Clock size={18} color={isDark ? '#fca5a5' : theme.danger} />
                                <Text style={{ fontSize: 13, color: isDark ? '#fca5a5' : '#991b1b', fontWeight: '500' }}>
                                    Auto-release in: <Text style={{ fontWeight: 'bold', color: isDark ? '#FFFFFF' : theme.danger }}>47m 23s</Text>
                                </Text>
                            </View>

                            {/* Action Buttons */}
                            <View style={{ gap: 10 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: isDark ? '#dc2626' : theme.danger, paddingVertical: 14, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 }}
                                    onPress={() => { /* Recall funds */ }}
                                >
                                    <RotateCcw size={18} color="#FFFFFF" />
                                    <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>Recall Funds Now</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)', paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.2)' : theme.danger }}
                                    onPress={() => { /* View details */ }}
                                >
                                    <Text style={{ color: isDark ? '#FFFFFF' : theme.danger, fontSize: 16, fontWeight: '600' }}>View Full Details</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>

                        {/* Info Card */}
                        <View style={{ backgroundColor: theme.card, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: theme.border }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.textPrimary, marginBottom: 8 }}>Why was this locked?</Text>
                            <Text style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 20 }}>
                                Veto AI detected a <Text style={{ fontWeight: 'bold' }}>Trust Bait</Text> pattern from the receiver address. We held the funds to keep you safe.
                            </Text>
                        </View>
                    </View>
                ) : (
                    /* Empty State */
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
                        <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: `${theme.success}08`, alignItems: 'center', justifyContent: 'center', marginBottom: 24, borderWidth: 1, borderColor: `${theme.success}30` }}>
                            <ShieldCheck size={64} color={theme.success} />
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.textPrimary, marginBottom: 8 }}>Vault is Empty</Text>
                        <Text style={{ fontSize: 16, color: theme.textSecondary, textAlign: 'center', lineHeight: 24 }}>
                            Your money is safe. No risky transactions are currently pending verification.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
