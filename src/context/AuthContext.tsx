// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {User, AuthState, LoginCredentials} from '../types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResult {
  success: boolean;
  message: string;
  user?: User;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_TOKEN_KEY = '@auth_token';
const USER_DATA_KEY = '@user_data';

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true, // Start with loading true to check persisted auth
    error: null,
  });

  // Check for persisted authentication on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const [token, userData] = await Promise.all([
        AsyncStorage.getItem(AUTH_TOKEN_KEY),
        AsyncStorage.getItem(USER_DATA_KEY),
      ]);

      if (token && userData) {
        const user: User = JSON.parse(userData);
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
        }));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
      }));
    }
  };

  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    // Show brief loading for splash effect
    setAuthState(prev => ({...prev, loading: true, error: null}));

    try {
      // Brief delay for splash screen effect
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple validation - just check if email and password are not empty
      if (credentials.email.trim() && credentials.password.trim()) {
        const user: User = {
          id: Date.now().toString(), // Simple ID generation
          email: credentials.email.trim(),
          role: 'user',
          firstName: 'User',
          lastName: '',
        };

        // Store auth data
        await Promise.all([
          AsyncStorage.setItem(AUTH_TOKEN_KEY, `token_${Date.now()}`),
          AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user)),
        ]);

        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });

        return {
          success: true,
          message: 'Login successful',
          user,
        };
      } else {
        const errorMessage = 'Please enter both email and password';
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));

        return {
          success: false,
          message: errorMessage,
        };
      }
    } catch (error) {
      const errorMessage = 'Something went wrong. Please try again.';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const logout = async () => {
    try {
      // Clear stored data
      await Promise.all([
        AsyncStorage.removeItem(AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(USER_DATA_KEY),
      ]);

      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const clearError = () => {
    setAuthState(prev => ({...prev, error: null}));
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
