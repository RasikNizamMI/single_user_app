import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
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
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
  Splash: undefined;
};