import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

type ActionButtonProps = {
    label: string;
    Icon: LucideIcon;
    onPress: () => void;
};

export const ActionButton: React.FC<ActionButtonProps> = ({ label, Icon, onPress }) => (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
        <View style={styles.actionButtonCircle}>
            <Icon size={24} color={COLORS.WHITE} />
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    actionItem: {
        alignItems: 'center',
        gap: 8,
        width: 70, // Fixed width for alignment
    },
    actionButtonCircle: {
        width: 52,
        height: 52,
        borderRadius: 20, // Squircle
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    actionLabel: {
        fontSize: 11,
        color: '#cbd5e1', // Slate 300
        fontWeight: '600',
        textAlign: 'center',
    },
});
