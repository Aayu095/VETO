import React from 'react';
import { View, Text } from 'react-native';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react-native';
import { styled } from 'nativewind';

interface RiskBadgeProps {
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    riskScore: number;
    size?: 'small' | 'medium' | 'large';
}

export default function RiskBadge({ riskLevel, riskScore, size = 'medium' }: RiskBadgeProps) {
    const getStyles = () => {
        switch (riskLevel) {
            case 'LOW':
                return {
                    bg: 'bg-emerald-500/10',
                    border: 'border-emerald-500/20',
                    text: 'text-emerald-500',
                    icon: '#10B981'
                };
            case 'MEDIUM':
                return {
                    bg: 'bg-amber-500/10',
                    border: 'border-amber-500/20',
                    text: 'text-amber-500',
                    icon: '#F59E0B'
                };
            case 'HIGH':
                return {
                    bg: 'bg-rose-500/10',
                    border: 'border-rose-500/20',
                    text: 'text-rose-500',
                    icon: '#F43F5E'
                };
            default:
                return {
                    bg: 'bg-slate-500/10',
                    border: 'border-slate-500/20',
                    text: 'text-slate-500',
                    icon: '#64748B'
                };
        }
    };

    const getIcon = (color: string, iconSize: number) => {
        switch (riskLevel) {
            case 'LOW': return <ShieldCheck size={iconSize} color={color} />;
            case 'MEDIUM': return <AlertTriangle size={iconSize} color={color} />;
            case 'HIGH': return <ShieldAlert size={iconSize} color={color} />;
            default: return <ShieldCheck size={iconSize} color={color} />;
        }
    };

    const styles = getStyles();

    // Size mapping
    const sizeConfig = {
        small: { px: 'px-2', py: 'py-0.5', text: 'text-xs', icon: 12 },
        medium: { px: 'px-3', py: 'py-1', text: 'text-sm', icon: 16 },
        large: { px: 'px-4', py: 'py-2', text: 'text-base', icon: 20 },
    };

    const config = sizeConfig[size];

    return (
        <View className={`flex-row items-center rounded-full border ${styles.bg} ${styles.border} ${config.px} ${config.py}`}>
            <View className="mr-1.5">
                {getIcon(styles.icon, config.icon)}
            </View>
            <Text className={`font-medium ${styles.text} ${config.text}`}>
                {riskLevel} • {riskScore}
            </Text>
        </View>
    );
}
