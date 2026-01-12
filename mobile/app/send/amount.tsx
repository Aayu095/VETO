import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, User, Delete } from 'lucide-react-native';
import { Colors, Typography, Spacing, Shadows } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';

export default function AmountScreen() {
    const router = useRouter();
    const { name, address } = useLocalSearchParams();
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const quickAmounts = [10, 50, 100, 500, 1000];

    const handleContinue = () => {
        if (!amount || parseFloat(amount) <= 0) return;

        router.push({
            pathname: '/send/review',
            params: {
                name: name || 'Unknown',
                address: address || '',
                amount,
                note,
            }
        });
    };

    const handleNumberPress = (num: string) => {
        if (num === '.' && amount.includes('.')) return;
        setAmount(amount + num);
    };

    const handleBackspace = () => {
        setAmount(amount.slice(0, -1));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ArrowLeft size={24} color={theme.textPrimary} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.textPrimary }}>Send Money</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Recipient Info */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginBottom: 24, padding: 12, backgroundColor: theme.card, borderRadius: 20, borderWidth: 1, borderColor: theme.border }}>
                    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: `${theme.primary}15`, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                        <User size={24} color={theme.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: theme.textPrimary, marginBottom: 2 }}>{name || 'New Recipient'}</Text>
                        <Text style={{ fontSize: 13, color: theme.textSecondary, fontFamily: 'monospace' }} numberOfLines={1}>{address || 'Enter address'}</Text>
                    </View>
                </View>

                {/* Amount Section */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 8 }}>Amount</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: theme.textPrimary, marginRight: 4 }}>$</Text>
                        <Text style={{ fontSize: 48, fontWeight: 'bold', color: theme.textPrimary }}>{amount || '0'}</Text>
                    </View>
                    <Text style={{ fontSize: 16, color: theme.textSecondary, marginTop: 4 }}>MNEE</Text>
                </View>

                {/* Quick Amount Buttons */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginHorizontal: 24, marginBottom: 24, gap: 8 }}>
                    {quickAmounts.map((quickAmount) => (
                        <TouchableOpacity
                            key={quickAmount}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: theme.card, borderRadius: 16, borderWidth: 1, borderColor: theme.border }}
                            onPress={() => setAmount(quickAmount.toString())}
                        >
                            <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textPrimary }}>${quickAmount}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Note (Optional) */}
                <View style={{ marginHorizontal: 24, marginBottom: 24 }}>
                    <TextInput
                        style={{ backgroundColor: theme.card, borderRadius: 20, padding: 16, fontSize: 16, color: theme.textPrimary, minHeight: 60, borderWidth: 1, borderColor: theme.border }}
                        placeholder="Add note (optional)"
                        placeholderTextColor={theme.textTertiary}
                        value={note}
                        onChangeText={setNote}
                        multiline
                    />
                </View>

                {/* Numpad */}
                <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 24, paddingBottom: 12 }}>
                    {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['.', '0', 'backspace']].map((row, rowIndex) => (
                        <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                            {row.map((key) => (
                                <TouchableOpacity
                                    key={key}
                                    style={{ width: '30%', aspectRatio: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.card, borderRadius: 20, borderWidth: 1, borderColor: theme.border }}
                                    onPress={() => key === 'backspace' ? handleBackspace() : handleNumberPress(key)}
                                >
                                    {key === 'backspace' ? (
                                        <Delete size={24} color={theme.textPrimary} />
                                    ) : (
                                        <Text style={{ fontSize: 24, fontWeight: '600', color: theme.textPrimary }}>{key}</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>

                {/* Continue Button */}
                <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
                    <TouchableOpacity
                        disabled={!amount || parseFloat(amount) <= 0}
                        onPress={handleContinue}
                        style={{ backgroundColor: theme.primary, paddingVertical: 18, borderRadius: 20, opacity: (!amount || parseFloat(amount) <= 0) ? 0.5 : 1 }}
                    >
                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.white,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontSize: Typography.sizes['2xl'],
        color: Colors.dark[900],
    },
    headerTitle: {
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
        color: Colors.dark[900],
    },
    recipientCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Spacing.xl,
        marginBottom: Spacing['2xl'],
        padding: Spacing.md,
        backgroundColor: Colors.light.gray50,
        borderRadius: 20,
    },
    recipientAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    avatarText: {
        fontSize: Typography.sizes['2xl'],
    },
    recipientInfo: {
        flex: 1,
    },
    recipientName: {
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.semibold,
        color: Colors.dark[900],
        marginBottom: 2,
    },
    recipientAddress: {
        fontSize: Typography.sizes.sm,
        color: Colors.light.gray500,
        fontFamily: Typography.fonts.mono,
    },
    amountSection: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    amountLabel: {
        fontSize: Typography.sizes.sm,
        color: Colors.light.gray500,
        marginBottom: Spacing.sm,
    },
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencySymbol: {
        fontSize: Typography.sizes['4xl'],
        fontWeight: Typography.weights.bold,
        color: Colors.dark[900],
        marginRight: Spacing.xs,
    },
    amountDisplay: {
        fontSize: Typography.sizes['5xl'],
        fontWeight: Typography.weights.extrabold,
        color: Colors.dark[900],
    },
    currencyLabel: {
        fontSize: Typography.sizes.base,
        color: Colors.light.gray500,
        marginTop: Spacing.xs,
    },
    quickAmounts: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginHorizontal: Spacing.xl,
        marginBottom: Spacing.xl,
        gap: Spacing.sm,
    },
    quickAmountButton: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        backgroundColor: Colors.light.gray100,
        borderRadius: 16,
    },
    quickAmountText: {
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.semibold,
        color: Colors.dark[900],
    },
    noteContainer: {
        marginHorizontal: Spacing.xl,
        marginBottom: Spacing.xl,
    },
    noteInput: {
        backgroundColor: Colors.light.gray50,
        borderRadius: 20,
        padding: Spacing.md,
        fontSize: Typography.sizes.base,
        color: Colors.dark[900],
        minHeight: 60,
    },
    numpad: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing.md,
    },
    numpadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    numpadButton: {
        width: '30%',
        aspectRatio: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.gray50,
        borderRadius: 20,
    },
    numpadText: {
        fontSize: Typography.sizes['2xl'],
        fontWeight: Typography.weights.semibold,
        color: Colors.dark[900],
    },
    bottomButton: {
        padding: Spacing.xl,
        backgroundColor: Colors.light.white,
    },
    continueButton: {
        borderRadius: 20,
        overflow: 'hidden',
        ...Shadows.md,
    },
    continueButtonDisabled: {
        opacity: 0.5,
    },
    continueGradient: {
        paddingVertical: Spacing.md,
        alignItems: 'center',
    },
    continueText: {
        color: Colors.light.white,
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.bold,
    },
});
