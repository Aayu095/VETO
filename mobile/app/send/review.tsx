import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ShieldAlert, TriangleAlert, ShieldCheck, Brain } from 'lucide-react-native';
import RiskBadge from '../../components/RiskBadge';
import { Colors, Typography, Spacing, Shadows } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';

export default function ReviewScreen() {
    const router = useRouter();
    const { name, address, amount } = useLocalSearchParams();
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';

    // Simulate risk assessment (in production, this comes from backend)
    const [riskData, setRiskData] = useState<any>(null);

    useEffect(() => {
        // Simulate API call to backend - reduced delay for better UX
        setTimeout(() => {
            // Check if it's the scam address (penny drop pattern)
            const isScam = typeof address === 'string' && address.endsWith('9e');

            setRiskData({
                riskLevel: isScam ? 'HIGH' : 'LOW',
                riskScore: isScam ? 98 : 12,
                patterns: isScam ? ['PENNY_DROP', 'FRESH_WALLET'] : [],
                explanation: isScam
                    ? "This looks like a 'Penny Drop' scam where fraudsters send a small test payment first, then request a large sum claiming it was a mistake. The recipient wallet is brand new with very few transactions."
                    : "No significant fraud patterns detected. Transaction appears safe.",
                recipientProfile: {
                    txCount: isScam ? 2 : 156,
                    walletAge: isScam ? 2 : 234,
                    balance: isScam ? 0 : 1.5,
                },
                vaultDelay: isScam ? 3600 : 0,
            });
        }, 100); // Reduced from 2000ms to 100ms
    }, [address]);

    if (!riskData) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={theme.primary} />
                    <Text style={{ marginTop: 16, fontSize: 16, color: theme.textSecondary }}>Analyzing transaction...</Text>
                </View>
            </SafeAreaView>
        );
    }

    const isHighRisk = riskData.riskLevel === 'HIGH'; // Changed from 'danger' to 'HIGH'
    const isMediumRisk = riskData.riskLevel === 'WARNING'; // Changed from 'warning' to 'WARNING'

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Status Icon */}
                <View style={styles.iconContainer}>
                    <View style={[
                        styles.iconCircle,
                        isHighRisk && styles.iconCircleDanger,
                        isMediumRisk && styles.iconCircleWarning,
                    ]}>
                        {isHighRisk ? (
                            <ShieldAlert size={64} color={Colors.risk.danger} />
                        ) : isMediumRisk ? (
                            <TriangleAlert size={64} color={Colors.risk.caution} />
                        ) : (
                            <ShieldCheck size={64} color={Colors.risk.safe} />
                        )}
                    </View>
                </View>

                {/* Title */}
                <Text style={[
                    styles.title,
                    isHighRisk && styles.titleDanger,
                    isMediumRisk && styles.titleWarning,
                ]}>
                    {isHighRisk ? 'INTERCEPTED' : isMediumRisk ? 'PROCEED WITH CAUTION' : 'Safe to Send'}
                </Text>

                {/* Subtitle */}
                <Text style={[styles.subtitle, isHighRisk && styles.subtitleDanger, !isHighRisk && { color: theme.textSecondary }]}>
                    {isHighRisk
                        ? 'CRITICAL ALERT: FRAUD PATTERN DETECTED.'
                        : isMediumRisk
                            ? 'This transaction shows some warning signs'
                            : 'No risk patterns detected. Transaction will be processed instantly.'}
                </Text>

                {/* Risk Badge */}
                <View style={styles.badgeContainer}>
                    <RiskBadge riskLevel={riskData.riskLevel} riskScore={riskData.riskScore} size="large" />
                </View>

                {/* Transaction Summary */}
                <View style={[styles.detailsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Transaction Details</Text>
                    <DetailRow label="Recipient" value={String(name)} />
                    <DetailRow label="Address" value={String(address)} mono />
                    <DetailRow label="Amount" value={`${Array.isArray(amount) ? amount[0] : amount} MNEE`} />
                    {isHighRisk && (
                        <DetailRow label="Vault Lock" value={`${riskData.vaultDelay / 3600} hour`} />
                    )}
                </View>

                {/* Recipient Profile */}
                <View style={[styles.detailsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Recipient Wallet</Text>

                    <DetailRow label="Transactions" value={riskData.recipientProfile.txCount.toString()} />
                    <DetailRow label="Wallet Age" value={`${riskData.recipientProfile.walletAge} days`} />
                    <DetailRow label="Balance" value={`${riskData.recipientProfile.balance} ETH`} />
                </View>

                {/* AI Explanation */}
                {riskData.patterns.length > 0 && (
                    <View style={[styles.explanationCard, isHighRisk && styles.explanationCardDanger, { backgroundColor: isDark ? theme.card : (isHighRisk ? Colors.risk.danger + '10' : Colors.light.gray50) }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm, gap: 8 }}>
                            <Brain size={20} color={theme.textPrimary} />
                            <Text style={[styles.explanationTitle, { marginBottom: 0, color: theme.textPrimary }]}>AI Analysis</Text>
                        </View>
                        <Text style={[styles.explanationText, { color: theme.textSecondary }]}>{riskData.explanation}</Text>

                        <View style={styles.patternsContainer}>
                            {riskData.patterns.map((pattern: string) => (
                                <View key={pattern} style={styles.patternBadge}>
                                    <Text style={styles.patternText}>{pattern.replace('_', ' ')}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Action Buttons - Now inside ScrollView */}
                <View style={{ marginTop: 32, marginBottom: 20 }}>
                    {isHighRisk ? (
                        <>
                            <TouchableOpacity
                                style={styles.dangerButton}
                                onPress={() => {
                                    // In production: Call backend to recall funds
                                    router.push('/');
                                }}
                            >
                                <Text style={styles.dangerButtonText}>EMERGENCY RECALL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={() => router.push('/vault')}
                            >
                                <Text style={[styles.secondaryButtonText, { color: theme.textSecondary }]}>Manage in Vault</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={styles.successButton}
                            onPress={() => {
                                // Navigate to confirmation screen
                                router.push({
                                    pathname: '/send/confirmation',
                                    params: { name, address, amount }
                                });
                            }}
                        >
                            <LinearGradient
                                colors={[Colors.risk.safe, '#059669']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.successGradient}
                            >
                                <Text style={styles.successButtonText}>Send {Array.isArray(amount) ? amount[0] : amount} MNEE</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    const { theme } = useTheme();

    return (
        <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>{label}</Text>
            <Text style={[styles.detailValue, { color: theme.textPrimary }, mono && styles.detailValueMono]} numberOfLines={1}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.white,
    },
    safeAreaDanger: {
        backgroundColor: '#450a0a', // Deep Red for SafeArea text contrast
    },
    gradientBackground: {
        flex: 1,
    },
    safeAreaWarning: {
        backgroundColor: '#FFFBEB',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing['3xl'],
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.risk.safe + '20',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: Colors.light.white,
        ...Shadows.xl,
    },
    iconCircleDanger: {
        backgroundColor: 'rgba(254, 202, 202, 0.1)', // Light red glass
        borderColor: 'rgba(254, 202, 202, 0.3)',
    },
    iconCircleWarning: {
        backgroundColor: Colors.risk.caution + '20',
    },
    iconText: {
        fontSize: 64,
    },
    title: {
        fontSize: Typography.sizes['3xl'],
        fontWeight: Typography.weights.extrabold,
        color: Colors.risk.safe,
        textAlign: 'center',
        marginBottom: Spacing.md,
    },
    titleDanger: {
        color: '#FECACA', // Light Red text on Dark Red BG
        fontSize: 32,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    titleWarning: {
        color: Colors.risk.caution,
    },
    subtitle: {
        fontSize: Typography.sizes.base,
        color: Colors.light.gray600,
        textAlign: 'center',
        marginBottom: Spacing.xl,
        lineHeight: 24,
    },
    subtitleDanger: {
        color: '#FCA5A5', // Light red for subtitle
    },
    badgeContainer: {
        alignItems: 'center',
        marginBottom: Spacing['2xl'],
    },
    detailsCard: {
        backgroundColor: Colors.light.white,
        borderRadius: 20,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.light.gray200,
    },
    cardTitle: {
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.bold,
        color: Colors.dark[900],
        marginBottom: Spacing.md,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    detailLabel: {
        fontSize: Typography.sizes.sm,
        color: Colors.light.gray500,
        fontWeight: Typography.weights.medium,
    },
    detailValue: {
        fontSize: Typography.sizes.sm,
        color: Colors.dark[900],
        fontWeight: Typography.weights.semibold,
        flex: 1,
        textAlign: 'right',
        marginLeft: Spacing.md,
    },
    detailValueMono: {
        fontFamily: Typography.fonts.mono,
        fontSize: Typography.sizes.xs,
    },
    explanationCard: {
        backgroundColor: Colors.light.gray50,
        borderRadius: 20,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
    },
    explanationCardDanger: {
        backgroundColor: Colors.risk.danger + '10',
    },
    explanationTitle: {
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.bold,
        color: Colors.dark[900],
        marginBottom: Spacing.sm,
    },
    explanationText: {
        fontSize: Typography.sizes.sm,
        color: Colors.dark[700],
        lineHeight: 20,
        marginBottom: Spacing.md,
    },
    patternsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.xs,
    },
    patternBadge: {
        backgroundColor: Colors.risk.danger + '20',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs / 2,
        borderRadius: 8,
    },
    patternText: {
        fontSize: Typography.sizes.xs,
        color: Colors.risk.danger,
        fontWeight: Typography.weights.semibold,
    },
    bottomActions: {
        padding: Spacing.xl,
        backgroundColor: Colors.light.white,
        borderTopWidth: 1,
        borderTopColor: Colors.light.gray200,
    },
    dangerButton: {
        backgroundColor: Colors.risk.danger,
        paddingVertical: Spacing.md,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: Spacing.sm,
        ...Shadows.lg,
    },
    dangerButtonText: {
        color: Colors.light.white,
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.bold,
    },
    secondaryButton: {
        paddingVertical: Spacing.md,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: Colors.light.gray600,
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.semibold,
    },
    successButton: {
        borderRadius: 20,
        overflow: 'hidden',
        ...Shadows.md,
    },
    successGradient: {
        paddingVertical: Spacing.md,
        alignItems: 'center',
    },
    successButtonText: {
        color: Colors.light.white,
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.bold,
    },
});
