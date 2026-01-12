/**
 * VETO Design System - BLUE Theme
 * All exports use lowercase keys for React Native compatibility
 */

// Spacing
export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
    '6xl': 64,
};

// Border Radius
export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
};

// Shadows
export const Shadows = {
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    blue: {
        shadowColor: '#1D4ED8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
};

// Colors
export const Colors = {
    primary: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        500: '#2563EB',
        600: '#1D4ED8',
        700: '#1E40AF',
    },
    navy: {
        dark: '#1E293B',
        darker: '#0F172A',
    },
    teal: {
        500: '#14B8A6',
        600: '#0D9488',
    },
    risk: {
        safe: '#10B981',
        caution: '#F59E0B',
        danger: '#EF4444',
    },
    dark: {
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A',
    },
    light: {
        white: '#FFFFFF',
        gray50: '#F9FAFB',
        gray100: '#F3F4F6',
        gray200: '#E5E7EB',
        gray300: '#D1D5DB',
        gray400: '#9CA3AF',
        gray500: '#6B7280',
        gray600: '#4B5563',
    },
};

// Typography
export const Typography = {
    fonts: {
        mono: 'SF Mono, Menlo, Monaco, monospace',
    },
    sizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
    },
    weights: {
        regular: '400' as '400',
        medium: '500' as '500',
        semibold: '600' as '600',
        bold: '700' as '700',
        extrabold: '800' as '800',
    },
};

// Uppercase versions for home screen
export const COLORS = {
    PRIMARY_500: '#2563EB',
    PRIMARY_600: '#1D4ED8',
    PRIMARY_700: '#1E40AF',
    PRIMARY_100: '#DBEAFE',
    PRIMARY_50: '#EFF6FF',
    NAVY_DARK: '#1E293B',
    NAVY_DARKER: '#0F172A',
    TEAL_500: '#14B8A6',
    TEAL_600: '#0D9488',
    RISK_SAFE: '#10B981',
    RISK_CAUTION: '#F59E0B',
    RISK_DANGER: '#EF4444',
    DARK_900: '#0F172A',
    DARK_800: '#1E293B',
    DARK_700: '#334155',
    GRAY_100: '#F3F4F6',
    GRAY_200: '#E5E7EB',
    GRAY_300: '#D1D5DB',
    GRAY_400: '#9CA3AF',
    GRAY_500: '#6B7280',
    GRAY_600: '#4B5563',
    WHITE: '#FFFFFF',
};

export const SPACING = {
    XS: Spacing.xs,
    SM: Spacing.sm,
    MD: Spacing.md,
    LG: Spacing.lg,
    XL: Spacing.xl,
    '2XL': Spacing['2xl'],
    '3XL': Spacing['3xl'],
    '4XL': Spacing['4xl'],
    '5XL': Spacing['5xl'],
    '6XL': Spacing['6xl'],
};

export const RADIUS = {
    SM: BorderRadius.sm,
    MD: BorderRadius.md,
    LG: BorderRadius.lg,
    XL: BorderRadius.xl,
    '2XL': BorderRadius['2xl'],
    '3XL': BorderRadius['3xl'],
    FULL: BorderRadius.full,
};
export const FONT_SIZE = {
    XS: 12,
    SM: 14,
    BASE: 16,
    LG: 18,
    XL: 20,
    '2XL': 24,
    '3XL': 30,
    '4XL': 36,
    '5XL': 48,
};
export const FONT_WEIGHT = {
    REGULAR: '400' as '400',
    MEDIUM: '500' as '500',
    SEMIBOLD: '600' as '600',
    BOLD: '700' as '700',
    EXTRABOLD: '800' as '800',
};
export const SHADOW_MD = Shadows.md;
export const SHADOW_LG = Shadows.lg;
export const SHADOW_XL = Shadows.xl;
export const SHADOW_BLUE = Shadows.blue;
