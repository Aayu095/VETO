import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();
  const { theme } = useTheme();
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Your Money, Protected by AI",
      desc: "VETO uses autonomous AI agents to detect fraud in real-time and protect you from scams before they happen.",
      icon: "🛡️",
      gradient: ['#2563EB', '#1D4ED8'] as const,
    },
    {
      title: "Intelligent Vault System",
      desc: "When AI detects risk, funds are automatically locked in a secure vault. You have the power to recall them anytime.",
      icon: "🔒",
      gradient: ['#14B8A6', '#0D9488'] as const,
    },
    {
      title: "Stop Scams Instantly",
      desc: "Penny drops, fresh wallets, and other fraud patterns are detected in milliseconds. Your money stays safe.",
      icon: "⚡",
      gradient: ['#1D4ED8', '#1E40AF'] as const,
    }
  ];

  const handleNext = async () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      await completeOnboarding();
      router.push('/(auth)/signup');
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    router.push('/(auth)/signup');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top', 'bottom']}>
      {/* Skip Button */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 24, paddingTop: 16 }}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: theme.textSecondary }}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        {/* Illustration */}
        <LinearGradient
          colors={slides[step].gradient}
          style={{ width: 240, height: 240, borderRadius: 120, alignItems: 'center', justifyContent: 'center', marginBottom: 64 }}
        >
          <Text style={{ fontSize: 120 }}>{slides[step].icon}</Text>
        </LinearGradient>

        {/* Text */}
        <Text style={{ fontSize: 28, fontWeight: '800', color: theme.textPrimary, textAlign: 'center', marginBottom: 16, lineHeight: 36 }}>
          {slides[step].title}
        </Text>
        <Text style={{ fontSize: 16, color: theme.textSecondary, textAlign: 'center', lineHeight: 24, paddingHorizontal: 16 }}>
          {slides[step].desc}
        </Text>
      </View>

      {/* Footer */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
        {/* Pagination Dots */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32, gap: 8 }}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={{
                height: 8,
                width: idx === step ? 32 : 8,
                borderRadius: 4,
                backgroundColor: idx === step ? theme.primary : theme.border
              }}
            />
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity onPress={handleNext} style={{ borderRadius: 20, overflow: 'hidden' }}>
          <LinearGradient
            colors={['#2563EB', '#1D4ED8'] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingVertical: 16, alignItems: 'center' }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
              {step === slides.length - 1 ? "Get Started" : "Continue"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
