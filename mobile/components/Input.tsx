import { View, Text, TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);

interface InputProps {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'numeric' | 'email-address';
    secureTextEntry?: boolean;
}

export const Input = ({ label, placeholder, value, onChangeText, keyboardType = 'default', secureTextEntry = false }: InputProps) => {
    return (
        <StyledView className="space-y-2 mb-4">
            <StyledText className="text-sm font-semibold text-slate-500 ml-1">{label}</StyledText>
            <StyledInput
                className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 text-base shadow-sm focus:border-blue-500"
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
        </StyledView>
    );
};
