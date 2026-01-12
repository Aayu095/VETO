import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Landmark, AlertCircle, Send } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function SendToBankScreen() {
    const router = useRouter();
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';
    const [amount, setAmount] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [accountName, setAccountName] = useState('');
    const [ifscCode, setIfscCode] = useState('');

    const handleSend = () => {
        // Navigate to AI scanning for verification
        router.push({
            pathname: '/send/scanning',
            params: {
                name: accountName,
                address: bankAccount,
                amount,
                note: `Bank Transfer - ${ifscCode}`
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView contentContainerStyle={{ padding: 24 }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                        <ArrowLeft size={24} color={theme.textPrimary} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.textPrimary }}>Send to Bank Account</Text>
                </View>

                {/* Info Banner */}
                <View style={{ flexDirection: 'row', gap: 12, padding: 16, backgroundColor: `${theme.primary}15`, borderRadius: 16, marginBottom: 24, borderWidth: 1, borderColor: `${theme.primary}30` }}>
                    <AlertCircle size={20} color={theme.primary} />
                    <Text style={{ flex: 1, fontSize: 14, color: theme.textSecondary, lineHeight: 20 }}>
                        Send money directly to any bank account. Transaction will be verified by AI for security.
                    </Text>
                </View>

                {/* Recipient Bank Details */}
                <View style={{ gap: 16, marginBottom: 24 }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>Account Holder Name</Text>
                        <TextInput
                            style={{ backgroundColor: theme.card, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: theme.textPrimary, borderWidth: 1, borderColor: theme.border }}
                            placeholder="Enter recipient's name"
                            placeholderTextColor={theme.textTertiary}
                            value={accountName}
                            onChangeText={setAccountName}
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>Bank Account Number</Text>
                        <TextInput
                            style={{ backgroundColor: theme.card, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: theme.textPrimary, borderWidth: 1, borderColor: theme.border }}
                            placeholder="Enter account number"
                            placeholderTextColor={theme.textTertiary}
                            keyboardType="number-pad"
                            value={bankAccount}
                            onChangeText={setBankAccount}
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>IFSC Code</Text>
                        <TextInput
                            style={{ backgroundColor: theme.card, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: theme.textPrimary, borderWidth: 1, borderColor: theme.border }}
                            placeholder="Enter IFSC code"
                            placeholderTextColor={theme.textTertiary}
                            value={ifscCode}
                            onChangeText={setIfscCode}
                            autoCapitalize="characters"
                        />
                    </View>
                </View>

                {/* Amount Input */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>Amount to Send</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 16, borderWidth: 1, borderColor: theme.border }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.textPrimary, marginRight: 8 }}>$</Text>
                        <TextInput
                            style={{ flex: 1, fontSize: 24, fontWeight: 'bold', color: theme.textPrimary }}
                            placeholder="0.00"
                            placeholderTextColor={theme.textTertiary}
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <Text style={{ fontSize: 14, color: theme.textSecondary }}>MNEE</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: theme.textTertiary, marginTop: 8 }}>Available: 1,234.56 MNEE</Text>
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={{ backgroundColor: theme.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, opacity: (!amount || !bankAccount || !accountName || !ifscCode) ? 0.5 : 1 }}
                    onPress={handleSend}
                    disabled={!amount || !bankAccount || !accountName || !ifscCode}
                >
                    <Send size={20} color="#FFFFFF" />
                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
