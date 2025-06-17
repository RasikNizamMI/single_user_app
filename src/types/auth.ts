import { StackNavigationProp } from "@react-navigation/stack";

export type AuthRouteParams = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: {token: string};
  VerifyEmail: {email: string};
  Main: undefined;
};

export type AuthNavigationProp = StackNavigationProp<AuthRouteParams>;

export interface LoginFormData {
  email: string;
  password: string;
  acceptTerms: boolean;
}
export interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  firstName: string;
  lastName: string;
}

export interface LoginFormErrors {
  email: string;
  password: string;
  terms: string;
}
export interface RegistrationFormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export type LoginCredentials = {
  email: string;
  password: string;
};


export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
export interface RegistrationResponse {
  message: string;
  user?: User;
}
export interface VerifyEmailRequest {
  email: string;
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}
export interface AuthErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}
