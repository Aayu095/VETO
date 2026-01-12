import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Search, ArrowLeft, User, Plus, ScanLine, ChevronRight } from 'lucide-react-native';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, RADIUS, SHADOW_MD } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';

export default function SendScreen() {
    const router = useRouter();
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';
    const [searchQuery, setSearchQuery] = useState('');

    const recentContacts = [
        { id: 1, name: 'Alice', address: '0x1234...5678', initial: 'A', color: '#EF4444' },
        { id: 2, name: 'Bob', address: '0x9876...4321', initial: 'B', color: '#F59E0B' },
        { id: 3, name: 'Charlie', address: '0xabcd...ef01', initial: 'C', color: '#10B981' },
    ];

    const allContacts = [
        { id: 4, name: 'Eleanor Cooper', address: '0x2468...1357', initial: 'E', color: '#3B82F6' },
        { id: 5, name: 'Jenny Wilson', address: '0x1357...2468', initial: 'J', color: '#8B5CF6' },
        { id: 6, name: 'Jacob Jones', address: '0xcd12...9e3f', initial: 'J', color: '#EC4899' },
        { id: 7, name: 'Floyd Miles', address: '0x4567...89ab', initial: 'F', color: '#6366F1' },
        { id: 8, name: 'Kathryn Murphy', address: '0x7890...cdef', initial: 'K', color: '#14B8A6' },
    ];

    const filteredContacts = searchQuery
        ? allContacts.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.address.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : allContacts;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
            <View style={styles.container}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                        <ArrowLeft size={24} color={theme.textPrimary} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.textPrimary }}>Send to Contact</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Search Bar with Scan Actions */}
                <View style={{ marginHorizontal: 24, marginBottom: 24 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: theme.border }}>
                        <Search size={20} color={theme.textSecondary} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 12, fontSize: 16, color: theme.textPrimary }}
                            placeholder="Search contacts"
                            placeholderTextColor={theme.textTertiary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <TouchableOpacity onPress={() => router.push('/send/scanning')}>
                            <ScanLine size={20} color={COLORS.PRIMARY_500} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Recent Contacts */}
                    {!searchQuery && (
                        <View style={{ marginBottom: 24 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: theme.textPrimary, marginBottom: 16, paddingHorizontal: 24 }}>Recent</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
                            >
                                {recentContacts.map((contact) => (
                                    <TouchableOpacity
                                        key={contact.id}
                                        style={{ alignItems: 'center', gap: 8 }}
                                        onPress={() => router.push({
                                            pathname: '/send/amount',
                                            params: { name: contact.name, address: contact.address }
                                        })}
                                    >
                                        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: contact.color, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' }}>{contact.initial}</Text>
                                        </View>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: theme.textPrimary }}>{contact.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* All Contacts List */}
                    <Text style={{ fontSize: 16, fontWeight: '600', color: theme.textPrimary, marginBottom: 16, paddingHorizontal: 24 }}>
                        {searchQuery ? 'Results' : 'Contacts'}
                    </Text>

                    {filteredContacts.map((contact) => (
                        <TouchableOpacity
                            key={contact.id}
                            style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 14, backgroundColor: theme.card, marginBottom: 1, borderWidth: 1, borderColor: theme.border }}
                            onPress={() => router.push({
                                pathname: '/send/amount',
                                params: { name: contact.name, address: contact.address }
                            })}
                        >
                            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: contact.color, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>{contact.initial}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16, fontWeight: '600', color: theme.textPrimary, marginBottom: 2 }}>{contact.name}</Text>
                                <Text style={{ fontSize: 13, color: theme.textSecondary, fontFamily: 'monospace' }} numberOfLines={1}>{contact.address}</Text>
                            </View>
                            <ChevronRight size={20} color={theme.textTertiary} />
                        </TouchableOpacity>
                    ))}

                    {filteredContacts.length === 0 && (
                        <View style={{ alignItems: 'center', paddingVertical: 48 }}>
                            <User size={48} color={theme.textTertiary} />
                            <Text style={{ fontSize: 16, color: theme.textSecondary, marginTop: 12 }}>No contacts found</Text>
                        </View>
                    )}

                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.XL,
        paddingVertical: SPACING.MD,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.GRAY_100,
    },
    headerTitle: {
        fontSize: FONT_SIZE.LG,
        fontWeight: 'bold',
        color: COLORS.DARK_900,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.GRAY_100,
        marginHorizontal: SPACING.XL,
        marginBottom: SPACING.LG,
        paddingHorizontal: SPACING.MD,
        paddingVertical: 12, // More height
        borderRadius: RADIUS.LG,
    },
    searchIcon: {
        marginRight: SPACING.SM,
    },
    searchInput: {
        flex: 1,
        fontSize: FONT_SIZE.BASE,
        color: COLORS.DARK_900,
        height: '100%',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: SPACING.XL,
        paddingBottom: 100,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.BASE,
        fontWeight: 'bold',
        color: COLORS.DARK_900,
        marginBottom: SPACING.MD,
        marginTop: SPACING.MD,
    },
    recentScroll: {
        gap: SPACING.LG,
        paddingRight: SPACING.XL,
        marginBottom: SPACING.MD,
    },
    recentContact: {
        alignItems: 'center',
        gap: 8,
    },
    recentAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addNewAvatar: {
        backgroundColor: COLORS.WHITE,
        borderWidth: 2,
        borderColor: COLORS.GRAY_200,
        borderStyle: 'dashed',
    },
    avatarText: {
        fontSize: FONT_SIZE.XL,
        fontWeight: 'bold',
        color: COLORS.WHITE,
    },
    recentName: {
        fontSize: FONT_SIZE.XS,
        color: COLORS.GRAY_600,
        fontWeight: '600',
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.GRAY_100,
    },
    contactLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.MD,
        flex: 1,
    },
    contactAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactName: {
        fontSize: FONT_SIZE.BASE,
        fontWeight: '600',
        color: COLORS.DARK_900,
        marginBottom: 2,
    },
    contactAddress: {
        fontSize: FONT_SIZE.SM,
        color: COLORS.GRAY_500,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: SPACING['4XL'],
        gap: SPACING.MD,
    },
    emptyText: {
        fontSize: FONT_SIZE.BASE,
        color: COLORS.GRAY_500,
    },
});
