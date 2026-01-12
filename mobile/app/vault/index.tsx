import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import GlassmorphicCard from '../../components/GlassmorphicCard';
import { Colors, Typography, Spacing, Shadows } from '../../constants/theme';

interface VaultLock {
    id: number;
    recipient: string;
    address: string;
    amount: string;
    unlockTime: number; // timestamp
    reason: string;
    riskScore: number;
}

export default function VaultScreen() {
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState(Date.now());

    // Mock vault locks (in production, fetch from backend/blockchain)
    const [locks, setLocks] = useState<VaultLock[]>([
        {
            id: 1,
            recipient: 'Unknown',
            address: '0xcd12...9e3f',
            amount: '18,000',
            unlockTime: Date.now() + 3600000, // 1 hour from now
            reason: 'Penny Drop scam detected',
            riskScore: 98,
        },
    ]);

    // Update current time every second for countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTimeRemaining = (unlockTime: number) => {
        const remaining = Math.max(0, unlockTime - currentTime);
        const hours = Math.floor(remaining / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    };

    const handleRecall = (lockId: number) => {
        // In production: Call smart contract to recall funds
        setLocks(locks.filter(lock => lock.id !== lockId));
    };

    const totalProtected = locks.reduce((sum, lock) => sum + parseFloat(lock.amount.replace(',', '')), 0);

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Vault</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Vault Header Card */}
                    <LinearGradient
                        colors={[Colors.primary[600], Colors.primary[700]]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.vaultHeader}
                    >
                        <Text style={styles.vaultIcon}>🔒</Text>
                        <Text style={styles.vaultTitle}>Protected Funds</Text>
                        <Text style={styles.vaultAmount}>${totalProtected.toLocaleString()} MNEE</Text>
                        <Text style={styles.vaultSubtitle}>
                            {locks.length} {locks.length === 1 ? 'transaction' : 'transactions'} in vault
                        </Text>
                    </LinearGradient>

                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.infoIcon}>ℹ️</Text>
                        <Text style={styles.infoText}>
                            Funds are locked in the vault when AI detects high-risk patterns. You can recall them anytime before the unlock timer expires.
                        </Text>
                    </View>

                    {/* Active Locks */}
                    {locks.length > 0 ? (
                        <>
                            <Text style={styles.sectionTitle}>Active Locks</Text>
                            {locks.map((lock) => {
                                const timeRemaining = formatTimeRemaining(lock.unlockTime);
                                const progress = Math.max(0, Math.min(100,
                                    ((lock.unlockTime - currentTime) / 3600000) * 100
                                ));

                                return (
                                    <View key={lock.id} style={styles.lockCard}>
                                        {/* Lock Header */}
                                        <View style={styles.lockHeader}>
                                            <View style={styles.lockIconContainer}>
                                                <Text style={styles.lockIcon}>🔒</Text>
                                            </View>
                                            <View style={styles.lockHeaderInfo}>
                                                <Text style={styles.lockRecipient}>{lock.recipient}</Text>
                                                <Text style={styles.lockAddress}>{lock.address}</Text>
                                            </View>
                                            <View style={styles.lockAmount}>
                                                <Text style={styles.lockAmountText}>${lock.amount}</Text>
                                                <Text style={styles.lockCurrency}>MNEE</Text>
                                            </View>
                                        </View>

                                        {/* Reason */}
                                        <View style={styles.reasonBadge}>
                                            <Text style={styles.reasonIcon}>⚠️</Text>
                                            <Text style={styles.reasonText}>{lock.reason}</Text>
                                        </View>

                                        {/* Countdown Timer */}
                                        <View style={styles.timerContainer}>
                                            <View style={styles.timerHeader}>
                                                <Text style={styles.timerLabel}>Time Remaining</Text>
                                                <Text style={styles.timerValue}>{timeRemaining}</Text>
                                            </View>
                                            <View style={styles.progressBar}>
                                                <View style={[styles.progressFill, { width: `${progress}%` }]} />
                                            </View>
                                        </View>

                                        {/* Actions */}
                                        <View style={styles.lockActions}>
                                            <TouchableOpacity
                                                style={styles.recallButton}
                                                onPress={() => handleRecall(lock.id)}
                                            >
                                                <Text style={styles.recallButtonText}>🚨 Emergency Recall</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.detailsButton}>
                                                <Text style={styles.detailsButtonText}>View Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </>
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyIcon}>🔓</Text>
                            <Text style={styles.emptyTitle}>No Active Locks</Text>
                            <Text style={styles.emptyText}>
                                When AI detects a risky transaction, funds will be locked here for your protection.
                            </Text>
                        </View>
                    )}

                    {/* Security Stats */}
                    <Text style={styles.sectionTitle}>Security Stats</Text>
                    <View style={styles.statsGrid}>
                        <GlassmorphicCard variant="light" style={styles.statCard}>
                            <Text style={styles.statValue}>0</Text>
                            <Text style={styles.statLabel}>Scams Prevented</Text>
                        </GlassmorphicCard>
                        <GlassmorphicCard variant="light" style={styles.statCard}>
                            <Text style={styles.statValue}>${totalProtected.toLocaleString()}</Text>
                            <Text style={styles.statLabel}>Total Protected</Text>
                        </GlassmorphicCard>
                    </View>

                    <View style={{ height: 100 }} />
                </ScrollView>
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xl,
    },
    vaultHeader: {
        borderRadius: 24,
        padding: Spacing['2xl'],
        alignItems: 'center',
        marginBottom: Spacing.lg,
        ...Shadows.blue,
    },
    vaultIcon: {
        fontSize: 64,
        marginBottom: Spacing.sm,
    },
    vaultTitle: {
        fontSize: Typography.sizes.base,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: Spacing.xs,
    },
    vaultAmount: {
        fontSize: Typography.sizes['4xl'],
        fontWeight: Typography.weights.extrabold,
        color: Colors.light.white,
        marginBottom: Spacing.xs,
    },
    vaultSubtitle: {
        fontSize: Typography.sizes.sm,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: Colors.primary[50],
        borderRadius: 20,
        padding: Spacing.md,
        marginBottom: Spacing.xl,
    },
    infoIcon: {
        fontSize: Typography.sizes.xl,
        marginRight: Spacing.sm,
    },
    infoText: {
        flex: 1,
        fontSize: Typography.sizes.sm,
        color: Colors.primary[900],
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: Typography.sizes.lg,
        fontWeight: Typography.weights.bold,
        color: Colors.dark[900],
        marginBottom: Spacing.md,
        marginTop: Spacing.md,
    },
    lockCard: {
        backgroundColor: Colors.light.white,
        borderWidth: 2,
        borderColor: Colors.risk.danger + '30',
        borderRadius: 20,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        ...Shadows.md,
    },
    lockHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    lockIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.risk.danger + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    lockIcon: {
        fontSize: Typography.sizes.xl,
    },
    lockHeaderInfo: {
        flex: 1,
    },
    lockRecipient: {
        fontSize: Typography.sizes.base,
        fontWeight: Typography.weights.semibold,
        color: Colors.dark[900],
        marginBottom: 2,
    },
    lockAddress: {
        fontSize: Typography.sizes.sm,
        color: Colors.light.gray500,
        fontFamily: Typography.fonts.mono,
    },
    lockAmount: {
        alignItems: 'flex-end',
    },
    lockAmountText: {
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
        color: Colors.dark[900],
    },
    lockCurrency: {
        fontSize: Typography.sizes.xs,
        color: Colors.light.gray500,
    },
    reasonBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.risk.danger + '10',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: 16,
        marginBottom: Spacing.md,
    },
    reasonIcon: {
        fontSize: Typography.sizes.base,
        marginRight: Spacing.xs,
    },
    reasonText: {
        fontSize: Typography.sizes.sm,
        color: Colors.risk.danger,
        fontWeight: Typography.weights.semibold,
    },
    timerContainer: {
        marginBottom: Spacing.md,
    },
    timerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    timerLabel: {
        fontSize: Typography.sizes.sm,
        color: Colors.light.gray600,
    },
    timerValue: {
        fontSize: Typography.sizes.lg,
        fontWeight: Typography.weights.bold,
        color: Colors.primary[600],
    },
    progressBar: {
        height: 8,
        backgroundColor: Colors.light.gray200,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: Colors.primary[500],
        borderRadius: 4,
    },
    lockActions: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    recallButton: {
        flex: 1,
        backgroundColor: Colors.risk.danger,
        paddingVertical: Spacing.md,
        borderRadius: 20,
        alignItems: 'center',
    },
    recallButtonText: {
        color: Colors.light.white,
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.bold,
    },
    detailsButton: {
        flex: 1,
        backgroundColor: Colors.light.gray100,
        paddingVertical: Spacing.md,
        borderRadius: 20,
        alignItems: 'center',
    },
    detailsButtonText: {
        color: Colors.dark[900],
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.semibold,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: Spacing['6xl'],
    },
    emptyIcon: {
        fontSize: 80,
        marginBottom: Spacing.lg,
    },
    emptyTitle: {
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
        color: Colors.dark[900],
        marginBottom: Spacing.sm,
    },
    emptyText: {
        fontSize: Typography.sizes.base,
        color: Colors.light.gray500,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: Spacing['2xl'],
    },
    statsGrid: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.xl,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: Spacing.lg,
    },
    statValue: {
        fontSize: Typography.sizes['2xl'],
        fontWeight: Typography.weights.bold,
        color: Colors.primary[600],
        marginBottom: Spacing.xs,
    },
    statLabel: {
        fontSize: Typography.sizes.sm,
        color: Colors.light.gray600,
        textAlign: 'center',
    },
});
