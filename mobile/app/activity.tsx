import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowDownLeft, ArrowUpRight, Coffee, ShoppingBag, Home as HomeIcon, Search, Filter, X } from 'lucide-react-native';
import { COLORS, FONT_SIZE, SPACING, SHADOW_MD } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';

const MOCK_ACTIVITY = [
    { id: '1', title: 'Starbucks', date: 'Today, 10:23 AM', amount: '- $4.50', type: 'sent', icon: 'coffee' },
    { id: '2', title: 'Deposit from Bank', date: 'Yesterday, 4:00 PM', amount: '+ $500.00', type: 'received', icon: 'deposit' },
    { id: '3', title: 'Uber Rides', date: 'Yesterday, 8:30 AM', amount: '- $16.99', type: 'sent', icon: 'shopping' },
    { id: '4', title: 'Rent Payment', date: 'Jan 1, 2025', amount: '- $1200.00', type: 'sent', icon: 'home' },
    { id: '5', title: 'Alex Smith', date: 'Dec 31, 2024', amount: '- $50.00', type: 'sent', icon: 'send' },
];

export default function ActivityScreen() {
    const router = useRouter();
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';

    const getIcon = (iconName: string) => {
        const iconColor = theme.textSecondary;
        switch (iconName) {
            case 'coffee': return <Coffee size={20} color={iconColor} />;
            case 'deposit': return <ArrowDownLeft size={20} color={COLORS.RISK_SAFE} />;
            case 'shopping': return <ShoppingBag size={20} color={iconColor} />;
            case 'home': return <HomeIcon size={20} color={iconColor} />;
            case 'send': return <ArrowUpRight size={20} color={iconColor} />;
            default: return <ArrowUpRight size={20} color={iconColor} />;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16 }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.textPrimary }}>Activity</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity
                        style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: theme.card }}
                        onPress={() => router.back()}
                    >
                        <X size={24} color={theme.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Filter Tabs */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 24, marginBottom: 16, gap: 12 }}>
                <TouchableOpacity style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: theme.primary }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: theme.card }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary }}>Sent</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: theme.card }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary }}>Received</Text>
                </TouchableOpacity>
            </View>

            {/* Transaction List */}
            <FlatList
                data={MOCK_ACTIVITY}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: theme.card, alignItems: 'center', justifyContent: 'center' }}>
                                {getIcon(item.icon)}
                            </View>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: theme.textPrimary, marginBottom: 2 }}>{item.title}</Text>
                                <Text style={{ fontSize: 12, color: theme.textSecondary }}>{item.date}</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: item.type === 'received' ? COLORS.RISK_SAFE : theme.textPrimary }}>
                            {item.amount}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
