import { Slot, Stack } from 'expo-router';
import { View, StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';

function RootLayoutNav() {
    const { theme, themeMode } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <StatusBar
                barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={theme.background}
            />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: theme.background },
                    animation: 'default',
                }}
            >
                <Stack.Screen name="index" options={{ animation: 'fade' }} />
                <Stack.Screen name="onboarding/index" options={{ animation: 'fade' }} />
                <Stack.Screen name="(auth)/signup" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="(auth)/welcome" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="(auth)/security" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="(auth)/login" options={{ animation: 'fade' }} />
                <Stack.Screen name="(tabs)" options={{ animation: 'slide_from_right' }} />
            </Stack>
        </View>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RootLayoutNav />
            </ThemeProvider>
        </AuthProvider>
    );
}
