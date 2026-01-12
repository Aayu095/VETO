import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Index() {
  const { isOnboarded, isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // Flow logic:
  // 1. Not onboarded → Show onboarding
  // 2. Onboarded but not authenticated → Show signup/auth
  // 3. Onboarded and authenticated → Show main app

  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/signup" />;
  }

  return <Redirect href="/(tabs)" />;
}
