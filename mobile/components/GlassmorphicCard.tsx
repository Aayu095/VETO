import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassmorphicCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'light' | 'dark' | 'purple';
}

export default function GlassmorphicCard({
    children,
    style,
    variant = 'light'
}: GlassmorphicCardProps) {
    const gradientColors: Record<string, readonly [string, string]> = {
        light: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)'] as const,
        dark: ['rgba(30, 41, 59, 0.8)', 'rgba(15, 23, 42, 0.9)'] as const,
        purple: ['rgba(168, 85, 247, 0.2)', 'rgba(147, 51, 234, 0.1)'] as const,
    };

    return (
        <View style={[styles.container, style]}>
            <LinearGradient
                colors={gradientColors[variant]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    {children}
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
});
