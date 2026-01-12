import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function SignupScreen() {
    const router = useRouter();
    const { createAccount } = useAuth();
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            // TODO: Implement actual signup logic
            // For now, navigate to security screen
            router.push('/(auth)/security');
        } catch (error) {
            console.log('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 32, paddingTop: 40, paddingBottom: 32 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={{ marginBottom: 40 }}>
                        <Text style={{ fontSize: 32, fontWeight: '800', color: theme.textPrimary, marginBottom: 8 }}>
                            Create Account
                        </Text>
                        <Text style={{ fontSize: 16, color: theme.textSecondary, lineHeight: 24 }}>
                            Sign up to get started with VETO and protect your money from scams.
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={{ gap: 20, marginBottom: 32 }}>
                        {/* Name Field */}
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>
                                Full Name
                            </Text>
                            <TextInput
                                style={{
                                    backgroundColor: theme.backgroundSecondary,
                                    borderWidth: 1,
                                    borderColor: theme.border,
                                    borderRadius: 12,
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                    fontSize: 16,
                                    color: theme.textPrimary
                                }}
                                placeholder="John Doe"
                                placeholderTextColor={theme.textTertiary}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        </View>

                        {/* Email Field */}
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>
                                Email Address
                            </Text>
                            <TextInput
                                style={{
                                    backgroundColor: theme.backgroundSecondary,
                                    borderWidth: 1,
                                    borderColor: theme.border,
                                    borderRadius: 12,
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                    fontSize: 16,
                                    color: theme.textPrimary
                                }}
                                placeholder="john@example.com"
                                placeholderTextColor={theme.textTertiary}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Field */}
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>
                                Password
                            </Text>
                            <TextInput
                                style={{
                                    backgroundColor: theme.backgroundSecondary,
                                    borderWidth: 1,
                                    borderColor: theme.border,
                                    borderRadius: 12,
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                    fontSize: 16,
                                    color: theme.textPrimary
                                }}
                                placeholder="Create a strong password"
                                placeholderTextColor={theme.textTertiary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        {/* Confirm Password Field */}
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: theme.textSecondary, marginBottom: 8 }}>
                                Confirm Password
                            </Text>
                            <TextInput
                                style={{
                                    backgroundColor: theme.backgroundSecondary,
                                    borderWidth: 1,
                                    borderColor: theme.border,
                                    borderRadius: 12,
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                    fontSize: 16,
                                    color: theme.textPrimary
                                }}
                                placeholder="Re-enter your password"
                                placeholderTextColor={theme.textTertiary}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.primary,
                            paddingVertical: 16,
                            borderRadius: 12,
                            alignItems: 'center',
                            marginBottom: 16,
                            opacity: loading ? 0.7 : 1
                        }}
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Create Account</Text>
                        )}
                    </TouchableOpacity>

                    {/* Terms */}
                    <Text style={{ fontSize: 12, color: theme.textTertiary, textAlign: 'center', lineHeight: 18 }}>
                        By creating an account, you agree to our{' '}
                        <Text style={{ color: theme.primary, fontWeight: '600' }}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text style={{ color: theme.primary, fontWeight: '600' }}>Privacy Policy</Text>
                    </Text>

                    {/* Spacer */}
                    <View style={{ flex: 1 }} />

                    {/* Login Link */}
                    <View style={{ paddingTop: 24, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                            <Text style={{ color: theme.textTertiary }}>
                                Already have an account?{' '}
                                <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Log In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
