import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(email, password);
            router.replace('/(tabs)');
        } catch (error) {
            console.log('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={{ flex: 1, paddingHorizontal: 32, justifyContent: 'center' }}>
                {/* Logo Section */}
                <View style={{ alignItems: 'center', marginBottom: 48 }}>
                    <View style={{ height: 80, width: 80, backgroundColor: theme.textPrimary, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8 }}>
                        <Text style={{ fontSize: 36, fontWeight: 'bold', color: theme.background, fontFamily: 'monospace' }}>V</Text>
                    </View>
                    <Text style={{ fontSize: 28, fontWeight: '800', color: theme.textPrimary, letterSpacing: -0.5 }}>VETO Protocol</Text>
                    <Text style={{ color: theme.textSecondary, fontWeight: '500', marginTop: 8 }}>Secure Payments. Zero Fraud.</Text>
                </View>

                {/* Form Section */}
                <View style={{ gap: 16 }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>Email or Wallet ID</Text>
                        <TextInput
                            style={{ backgroundColor: theme.backgroundSecondary, borderWidth: 1, borderColor: theme.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: theme.textPrimary }}
                            placeholder="user@veto.app"
                            placeholderTextColor={theme.textTertiary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>Password</Text>
                        <TextInput
                            style={{ backgroundColor: theme.backgroundSecondary, borderWidth: 1, borderColor: theme.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: theme.textPrimary }}
                            placeholder="Enter your password"
                            placeholderTextColor={theme.textTertiary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={{ backgroundColor: theme.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8, opacity: loading ? 0.7 : 1 }}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 16 }}>
                        <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Use Biometrics (FaceID)</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <View style={{ paddingBottom: 32, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={{ color: theme.textTertiary }}>
                        Don't have an account? <Text style={{ color: theme.textPrimary, fontWeight: 'bold' }}>Create Wallet</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
