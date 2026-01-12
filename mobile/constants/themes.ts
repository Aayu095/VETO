export const lightTheme = {
    // Backgrounds
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    backgroundTertiary: '#F1F5F9',
    card: '#FFFFFF',

    // Text
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',

    // Accents
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',

    // UI Elements
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    shadow: 'rgba(0, 0, 0, 0.1)',

    // Footer
    footerBackground: '#FFFFFF',
    footerBorder: '#E5E7EB',
    footerActive: '#3B82F6',
    footerInactive: '#9CA3AF',

    // Special
    vetoGreen: '#00E599',
    gradientStart: '#DBEAFE',
    gradientEnd: '#EFF6FF',
};

export const darkTheme = {
    // Backgrounds
    background: '#000000',
    backgroundSecondary: '#111111',
    backgroundTertiary: '#1A1A1A',
    card: '#111111',

    // Text
    textPrimary: '#FFFFFF',
    textSecondary: '#9CA3AF',
    textTertiary: '#6B7280',

    // Accents
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',

    // UI Elements
    border: 'rgba(255, 255, 255, 0.1)',
    borderLight: 'rgba(255, 255, 255, 0.05)',
    shadow: 'rgba(0, 0, 0, 0.5)',

    // Footer
    footerBackground: 'rgba(10, 10, 10, 0.95)',
    footerBorder: 'rgba(255, 255, 255, 0.1)',
    footerActive: '#FFFFFF',
    footerInactive: '#4B5563',

    // Special
    vetoGreen: '#00E599',
    gradientStart: '#172554',
    gradientEnd: '#020617',
};

export type Theme = typeof lightTheme;
