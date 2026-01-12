import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    isOnboarded: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
    completeOnboarding: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    createAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ONBOARDING_KEY = '@veto_onboarding_complete';
const AUTH_KEY = '@veto_authenticated';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAuthState();
    }, []);

    const loadAuthState = async () => {
        try {
            const [onboardingStatus, authStatus] = await Promise.all([
                AsyncStorage.getItem(ONBOARDING_KEY),
                AsyncStorage.getItem(AUTH_KEY),
            ]);

            setIsOnboarded(onboardingStatus === 'true');
            setIsAuthenticated(authStatus === 'true');
        } catch (error) {
            console.log('Error loading auth state:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
            setIsOnboarded(true);
        } catch (error) {
            console.log('Error completing onboarding:', error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            // TODO: Implement actual authentication logic
            // For now, just set authenticated state
            await AsyncStorage.setItem(AUTH_KEY, 'true');
            setIsAuthenticated(true);
        } catch (error) {
            console.log('Error logging in:', error);
            throw error;
        }
    };

    const createAccount = async () => {
        try {
            // After creating account/key, user is authenticated
            await AsyncStorage.setItem(AUTH_KEY, 'true');
            setIsAuthenticated(true);
        } catch (error) {
            console.log('Error creating account:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.multiRemove([AUTH_KEY, ONBOARDING_KEY]);
            setIsAuthenticated(false);
            setIsOnboarded(false);
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isOnboarded,
                isAuthenticated,
                isLoading,
                completeOnboarding,
                login,
                logout,
                createAccount,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
