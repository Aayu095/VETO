import { View, Text, TouchableOpacity, TextInput, ScrollView, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, User, QrCode, Share2 } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function RequestMoneyScreen() {
    const router = useRouter();
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const handleGenerateRequest = async () => {
        const requestLink = `veto://pay?amount=${amount}&note=${encodeURIComponent(note)}`;

        try {
            await Share.share({
                message: `Please send me ${amount} MNEE${note ? ` for: ${note}` : ''}\n\nPay via VETO: ${requestLink}`,
                title: 'Payment Request'
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView contentContainerStyle={{ padding: 24 }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                        <ArrowLeft size={24} color={theme.textPrimary} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.textPrimary }}>Request Money</Text>
                </View>

                {/* QR Code Placeholder */}
                <View style={{ alignItems: 'center', marginBottom: 32 }}>
                    <View style={{ width: 200, height: 200, borderRadius: 24, backgroundColor: theme.card, borderWidth: 2, borderColor: theme.border, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                        <QrCode size={120} color={theme.textTertiary} />
                    </View>
                    <Text style={{ fontSize: 14, color: theme.textSecondary, textAlign: 'center' }}>
                        Your payment QR code will appear here
                    </Text>
                </View>

                {/* Amount Input */}
                <View style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>Amount to Request</Text>
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
                </View>

                {/* Note Input */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>Note (Optional)</Text>
                    <TextInput
                        style={{ backgroundColor: theme.card, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: theme.textPrimary, borderWidth: 1, borderColor: theme.border, minHeight: 80, textAlignVertical: 'top' }}
                        placeholder="What's this payment for?"
                        placeholderTextColor={theme.textTertiary}
                        value={note}
                        onChangeText={setNote}
                        multiline
                    />
                </View>

                {/* Action Buttons */}
                <View style={{ gap: 12 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: theme.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, opacity: !amount ? 0.5 : 1 }}
                        onPress={handleGenerateRequest}
                        disabled={!amount}
                    >
                        <Share2 size={20} color="#FFFFFF" />
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Share Payment Request</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: theme.card, paddingVertical: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: theme.border }}
                        onPress={() => {/* Show QR code */ }}
                    >
                        <Text style={{ color: theme.textPrimary, fontSize: 16, fontWeight: '600' }}>Show QR Code</Text>
                    </TouchableOpacity>
                </View>

                {/* Info */}
                <View style={{ marginTop: 24, padding: 16, backgroundColor: `${theme.vetoGreen}15`, borderRadius: 16, borderWidth: 1, borderColor: `${theme.vetoGreen}30` }}>
                    <Text style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 20 }}>
                        💡 Share this request with anyone. They can pay you by scanning the QR code or clicking the link.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
