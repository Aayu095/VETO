import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';

const StyledButton = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    loading?: boolean;
}

export const Button = ({ title, onPress, variant = 'primary', loading = false }: ButtonProps) => {
    const bgColors = {
        primary: 'bg-slate-900',
        secondary: 'bg-slate-200',
        danger: 'bg-red-600',
    };

    const textColors = {
        primary: 'text-white',
        secondary: 'text-slate-900',
        danger: 'text-white',
    };

    return (
        <StyledButton
            className={`w-full p-4 rounded-xl items-center justify-center ${bgColors[variant]} active:opacity-90`}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <StyledText className={`font-bold text-lg ${textColors[variant]}`}>
                    {title}
                </StyledText>
            )}
        </StyledButton>
    );
};
