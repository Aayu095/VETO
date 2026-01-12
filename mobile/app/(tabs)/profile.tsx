import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Shield, CreditCard, Bell, ChevronRight, LogOut, Lock, Moon, Sun } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
    const { theme, themeMode, toggleTheme } = useTheme();
    const { logout } = useAuth();
    const router = useRouter();
    const isDark = themeMode === 'dark';

    const handleLogout = async () => {
        await logout();
        router.replace('/onboarding');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
                {/* Profile Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 16 }}>
                    <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: theme.border }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' }}>J</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.textPrimary }}>Jansen</Text>
                        <Text style={{ color: theme.textSecondary, fontSize: 14 }}>@jansen_veto</Text>
                    </View>
                </View>

                {/* Section: Appearance */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ color: theme.textTertiary, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 }}>Appearance</Text>

                    <TouchableOpacity
                        onPress={toggleTheme}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.borderLight }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.backgroundSecondary }}>
                                {isDark ? <Moon size={20} color={theme.textPrimary} /> : <Sun size={20} color={theme.textPrimary} />}
                            </View>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: theme.textPrimary }}>Dark Mode</Text>
                                <Text style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>
                                    {isDark ? 'Dark theme enabled' : 'Light theme enabled'}
                                </Text>
                            </View>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: theme.border, true: theme.primary }}
                            thumbColor="#FFFFFF"
                        />
                    </TouchableOpacity>
                </View>

                {/* Section: Account */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ color: theme.textTertiary, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 }}>Account</Text>

                    <SettingItem
                        icon={<User size={20} color={theme.textSecondary} />}
                        label="Personal Info"
                        theme={theme}
                    />
                    <SettingItem
                        icon={<CreditCard size={20} color={theme.textSecondary} />}
                        label="Payment Methods"
                        theme={theme}
                    />
                    <SettingItem
                        icon={<Bell size={20} color={theme.textSecondary} />}
                        label="Notifications"
                        theme={theme}
                    />
                </View>

                {/* Section: Security */}
                <View style={{ marginBottom: 32 }}>
                    <Text style={{ color: theme.textTertiary, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 }}>Security</Text>

                    <SettingItem
                        icon={<Shield size={20} color={theme.vetoGreen} />}
                        label="Security Center"
                        isHighlight
                        theme={theme}
                    />
                    <SettingItem
                        icon={<Lock size={20} color={theme.textSecondary} />}
                        label="Vault Settings"
                        theme={theme}
                    />
                </View>

                {/* Log Out */}
                <TouchableOpacity
                    onPress={handleLogout}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, marginTop: 16, backgroundColor: `${theme.danger}15`, borderRadius: 16, borderWidth: 1, borderColor: `${theme.danger}30` }}
                >
                    <LogOut size={20} color={theme.danger} />
                    <Text style={{ color: theme.danger, fontWeight: 'bold', fontSize: 16 }}>Log Out</Text>
                </TouchableOpacity>

                <Text style={{ color: theme.textTertiary, fontSize: 12, textAlign: 'center', marginTop: 32, opacity: 0.5 }}>Version 2.0.1 (VETO Beta)</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

function SettingItem({ icon, label, isHighlight, rightElement, theme }: { icon: React.ReactNode, label: string, isHighlight?: boolean, rightElement?: React.ReactNode, theme: any }) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.borderLight }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: isHighlight ? `${theme.vetoGreen}15` : theme.backgroundSecondary }}>
                    {icon}
                </View>
                <Text style={{ fontSize: 16, fontWeight: '500', color: isHighlight ? theme.vetoGreen : theme.textPrimary }}>{label}</Text>
            </View>
            {rightElement || <ChevronRight size={20} color={theme.textTertiary} />}
        </TouchableOpacity>
    );
}
