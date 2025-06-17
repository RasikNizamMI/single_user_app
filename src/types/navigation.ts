import { NavigatorScreenParams } from "@react-navigation/native/lib/typescript/src";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type TabParamList = {
  Home: undefined;
  Services: undefined;
  Chat: undefined;
  More: undefined;
};

export type MainStackParamList = {
  Dashboard: NavigatorScreenParams<TabParamList>;
  Services: {taskId: string};
  ChatDetail: {chatId: string};
  Profile: undefined;
  Settings: undefined;
  Notifications: undefined;
  // Payment screens
  Payment: undefined;
  ChoosePaymentMethod: {
    paymentData: {
      amount: string;
      service: string;
      dueDate: string;
    };
  };
  PaymentInvoice: {
    paymentData: {
      amount: string;
      service: string;
      dueDate: string;
    };
    selectedMethod?: {
      id: string;
      type: string;
      label: string;
      lastFour: string;
    };
  };
  PaymentHistory: undefined;
  SavedPaymentModes: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
  Splash: undefined;
};

// Navigation hook types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
