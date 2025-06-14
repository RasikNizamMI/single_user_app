import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {User, AuthState, LoginCredentials} from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false, // Initially false
    error: null,
  });

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({...prev, loading: true, error: null}));

    return new Promise(resolve => {
      setTimeout(() => {
        if (
          credentials.email === 'test@example.com' &&
          credentials.password === 'password'
        ) {
          const user: User = {
            id: '1',
            name: 'Test User',
            email: credentials.email,
            role: 'user',
          };
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
            error: null,
          });
          resolve(true);
        } else {
          setAuthState(prev => ({
            ...prev,
            loading: false,
            error: 'Invalid email or password',
          }));
          resolve(false);
        }
      }, 5000); // Simulate 5s delay
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
