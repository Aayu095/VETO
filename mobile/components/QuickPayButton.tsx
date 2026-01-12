import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { styled } from 'nativewind';

interface QuickPayButtonProps {
    onPress: () => void;
}

export const QuickPayButton: React.FC<QuickPayButtonProps> = ({ onPress }) => (
    <View className="absolute bottom-32 right-6 z-50">
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className="w-16 h-16 rounded-full bg-blue-600 items-center justify-center shadow-lg border border-white/20"
            style={{
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.5,
                shadowRadius: 16,
                elevation: 10
            }}
        >
            <View className="items-center justify-center">
                <Plus size={32} color="#FFFFFF" strokeWidth={2.5} />
            </View>
        </TouchableOpacity>
    </View>
);
