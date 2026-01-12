import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ArrowDownLeft, ScanLine, ShoppingBag, User, ChevronRight, Plus, Landmark, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';

export default function HomeScreen() {
    const router = useRouter();
    const { theme, themeMode, toggleTheme } = useTheme();
    const isDark = themeMode === 'dark';

    const transactions = [
        { id: 1, type: 'received', from: 'Main Account', amount: '+ $500.00', time: '10:42 AM', isPositive: true },
        { id: 2, type: 'sent', to: 'Starbucks', amount: '- $4.50', time: '8:50 AM', isPositive: false },
        { id: 3, type: 'sent', to: 'Uber Rides', amount: '- $16.99', time: 'Yesterday', isPositive: false },
        { id: 4, type: 'sent', to: 'Alex Smith', amount: '- $50.00', time: 'Yesterday', isPositive: false },
    ];

    const recentPeople = [
        { id: '1', name: 'Alex', initial: 'A', color: 'bg-red-500' },
        { id: '2', name: 'Sam', initial: 'S', color: 'bg-amber-500' },
        { id: '3', name: 'Mom', initial: 'M', color: 'bg-emerald-500' },
        { id: '4', name: 'Jansen', initial: 'J', color: 'bg-blue-500' },
        { id: 'new', name: 'New', initial: '+', color: '', isAction: true },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 }}>
                    <View>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.textPrimary }}>Hi, Jansen</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.backgroundSecondary, borderWidth: 1, borderColor: theme.border, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <Bell size={20} color={theme.textPrimary} />
                            <View style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: theme.danger, borderWidth: 1, borderColor: theme.background }} />
                        </TouchableOpacity>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.primary, borderWidth: 2, borderColor: theme.border, overflow: 'hidden' }}>
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?u=jansen' }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                    </View>
                </View>

                {/* Vault Status - Informational Only */}
                <View style={{ marginBottom: 24, marginHorizontal: 24 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: theme.card, borderRadius: 16, borderWidth: 1, borderColor: theme.border }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: `${theme.vetoGreen}15`, alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldCheck size={16} color={theme.vetoGreen} />
                            </View>
                            <Text style={{ color: theme.textSecondary, fontWeight: '500', fontSize: 14 }}>
                                Vault Status: <Text style={{ color: theme.vetoGreen, fontWeight: 'bold' }}>Secure</Text>
                            </Text>
                        </View>
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.vetoGreen }} />
                    </View>
                </View>

                {/* Balance Card */}
                <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
                    <LinearGradient
                        colors={isDark ? ['#172554', '#020617'] : [theme.gradientStart, theme.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ padding: 24, borderRadius: 32, borderWidth: 1, borderColor: theme.border, position: 'relative', overflow: 'hidden', shadowColor: theme.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 }}
                    >
                        {/* Balance Content */}
                        <View style={{ marginBottom: 32 }}>
                            <Text style={{ color: theme.textSecondary, fontWeight: '500', fontSize: 14, marginBottom: 4 }}>Total Balance</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={{ fontSize: 24, color: theme.textPrimary, fontWeight: 'bold', marginRight: 4 }}>$</Text>
                                <Text style={{ fontSize: 48, fontWeight: '800', color: theme.textPrimary, letterSpacing: -2 }}>45,423</Text>
                                <Text style={{ fontSize: 20, color: theme.textSecondary, fontWeight: '600' }}>.00</Text>
                            </View>
                        </View>

                        {/* Action Grid */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <ActionButton label="To Mobile Contact" icon={<User size={24} color={isDark ? '#FFF' : theme.primary} />} onPress={() => router.push('/send')} theme={theme} isDark={isDark} />
                            <ActionButton label="Scan QR" icon={<ScanLine size={24} color={isDark ? '#FFF' : theme.primary} />} onPress={() => router.push('/send/qr-scanner')} theme={theme} isDark={isDark} />
                            <ActionButton label="To Bank" icon={<Landmark size={24} color={isDark ? '#FFF' : theme.primary} />} onPress={() => router.push('/withdraw')} theme={theme} isDark={isDark} />
                            <ActionButton label="Request Money" icon={<Plus size={24} color={isDark ? '#FFF' : theme.primary} />} onPress={() => router.push('/request')} theme={theme} isDark={isDark} />
                        </View>
                    </LinearGradient>
                </View>

                {/* Quick People Rail */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ color: theme.textPrimary, fontWeight: 'bold', fontSize: 18, paddingHorizontal: 24, marginBottom: 16 }}>People</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 20 }}>
                        {recentPeople.map((person) => (
                            <TouchableOpacity key={person.id} style={{ alignItems: 'center', gap: 8 }} onPress={() => router.push('/send')}>
                                <View
                                    className={person.isAction ? '' : `w-14 h-14 rounded-full items-center justify-center ${person.color}`}
                                    style={person.isAction ? {
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: theme.backgroundSecondary,
                                        borderWidth: 2,
                                        borderStyle: 'dashed',
                                        borderColor: theme.border
                                    } : {}}
                                >
                                    <Text style={{ color: person.isAction ? theme.textSecondary : '#FFFFFF', fontWeight: 'bold', fontSize: 18 }}>{person.initial}</Text>
                                </View>
                                <Text style={{ color: theme.textTertiary, fontSize: 12, fontWeight: '500' }}>{person.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Recent Activity */}
                <View style={{ paddingHorizontal: 24 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <Text style={{ color: theme.textPrimary, fontWeight: 'bold', fontSize: 18 }}>Recent Activity</Text>
                        <TouchableOpacity>
                            <Text style={{ color: theme.primary, fontWeight: '600', fontSize: 14 }}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: 16 }}>
                        {transactions.map((tx) => (
                            <View key={tx.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                                    <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: theme.backgroundSecondary, borderWidth: 1, borderColor: theme.borderLight, alignItems: 'center', justifyContent: 'center' }}>
                                        {tx.type === 'received' ? (
                                            <ArrowDownLeft size={20} color={theme.success} />
                                        ) : (
                                            <ShoppingBag size={20} color={theme.textTertiary} />
                                        )}
                                    </View>
                                    <View>
                                        <Text style={{ color: theme.textPrimary, fontWeight: '600', fontSize: 16 }}>
                                            {tx.type === 'received' ? `Received from ${tx.from}` : tx.to}
                                        </Text>
                                        <Text style={{ color: theme.textTertiary, fontSize: 12, marginTop: 2 }}>{tx.time}</Text>
                                    </View>
                                </View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: tx.isPositive ? theme.success : theme.textPrimary }}>
                                    {tx.amount}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Inline Component for Actions
function ActionButton({ label, icon, onPress, theme, isDark }: { label: string, icon: React.ReactNode, onPress: () => void, theme: any, isDark: boolean }) {
    return (
        <TouchableOpacity style={{ alignItems: 'center', gap: 8, width: 70 }} onPress={onPress}>
            <View style={{ width: 56, height: 56, borderRadius: 20, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : theme.backgroundSecondary, borderWidth: 1, borderColor: theme.border, alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </View>
            <Text style={{ color: theme.textSecondary, fontSize: 10, fontWeight: 'bold', textAlign: 'center' }}>{label}</Text>
        </TouchableOpacity>
    );
}
