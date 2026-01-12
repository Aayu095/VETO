import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';

export default function WelcomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center' }}>
        {/* Illustration */}
        <View style={{ height: 192, width: 192, backgroundColor: '#EFF6FF', borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 40, transform: [{ rotate: '3deg' }] }}>
          <Text style={{ fontSize: 70 }}>👛</Text>
        </View>

        <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.textPrimary, textAlign: 'center', marginBottom: 16 }}>
          Create a key or import an existing key
        </Text>
        <Text style={{ color: theme.textSecondary, textAlign: 'center', fontSize: 16, lineHeight: 24, marginBottom: 48 }}>
          Store your assets safely and securely with VETO's self-custody app.
        </Text>

        {/* Actions Stack */}
        <View style={{ width: '100%', gap: 16 }}>
          <TouchableOpacity
            style={{ width: '100%', backgroundColor: theme.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
            onPress={() => {
              console.log('Navigating to security screen');
              router.push('/(auth)/security');
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 }}>Create a Key</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: '100%', backgroundColor: theme.background, borderWidth: 1, borderColor: theme.border, paddingVertical: 16, borderRadius: 16, alignItems: 'center' }}
            onPress={() => {
              console.log('Navigating to login screen');
              router.push('/(auth)/login');
            }}
          >
            <Text style={{ color: theme.textPrimary, fontWeight: 'bold', fontSize: 18 }}>I already have a Key</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
