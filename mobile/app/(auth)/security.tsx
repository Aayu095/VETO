import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function SecurityScreen() {
  const router = useRouter();
  const { createAccount } = useAuth();
  const { theme } = useTheme();

  const handleSetupSecurity = async (method: 'pin' | 'biometric' | 'skip') => {
    // TODO: Implement actual PIN/Biometric setup
    // For now, just complete the account creation
    await createAccount();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, paddingHorizontal: 32, justifyContent: 'center', alignItems: 'center' }}>
        {/* Header Skip */}
        <View style={{ position: 'absolute', top: 48, right: 24 }}>
          <TouchableOpacity onPress={() => handleSetupSecurity('skip')}>
            <Text style={{ color: theme.primary, fontWeight: 'bold', fontSize: 18 }}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Illustration */}
        <View style={{ height: 224, width: 160, backgroundColor: theme.primary, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8, transform: [{ rotate: '-5deg' }] }}>
          <View style={{ backgroundColor: '#60A5FA', height: 80, width: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 40 }}>🔒</Text>
          </View>
        </View>

        <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.textPrimary, textAlign: 'center', marginBottom: 16 }}>
          Protect your wallet
        </Text>
        <Text style={{ color: theme.textSecondary, textAlign: 'center', fontSize: 16, lineHeight: 24, marginBottom: 48, paddingHorizontal: 16 }}>
          Set up an extra layer of security to keep your wallet secure.
        </Text>

        {/* Actions Stack */}
        <View style={{ width: '100%', gap: 16 }}>
          <TouchableOpacity
            style={{ width: '100%', backgroundColor: theme.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
            onPress={() => handleSetupSecurity('pin')}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 }}>PIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: '100%', backgroundColor: theme.background, borderWidth: 1, borderColor: theme.border, paddingVertical: 16, borderRadius: 16, alignItems: 'center' }}
            onPress={() => handleSetupSecurity('biometric')}
          >
            <Text style={{ color: theme.textPrimary, fontWeight: 'bold', fontSize: 18 }}>Biometric</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
