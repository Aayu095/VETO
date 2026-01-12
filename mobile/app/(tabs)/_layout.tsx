import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Home, ShieldCheck, Settings } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../contexts/ThemeContext';

export default function TabLayout() {
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: isDark ? 'rgba(10, 10, 10, 0.95)' : '#FFFFFF',
                    borderRadius: 0,
                    height: 85,
                    borderTopWidth: 1,
                    borderTopColor: theme.footerBorder,
                    paddingBottom: 20,
                    paddingTop: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: isDark ? 0.3 : 0.05,
                    shadowRadius: 8,
                    elevation: 8,
                },
                tabBarItemStyle: {
                    height: 70,
                    paddingVertical: 6,
                },
                tabBarBackground: () => (
                    isDark && Platform.OS === 'ios' ? (
                        <BlurView intensity={40} tint="dark" style={{ flex: 1, overflow: 'hidden' }} />
                    ) : null
                ),
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarActiveTintColor: theme.footerActive,
                tabBarInactiveTintColor: theme.footerInactive,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Home size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
                    )
                }}
            />

            <Tabs.Screen
                name="vault"
                options={{
                    title: 'Vault',
                    tabBarIcon: ({ color, focused }) => (
                        <ShieldCheck size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <Settings size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
                    )
                }}
            />
        </Tabs>
    );
}

