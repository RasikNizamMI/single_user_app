import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackParamList} from '../types/navigation';
import TabNavigator from './TabNavigator';

// Import additional screens that are not part of tabs
import ServicesScreen from '../screens/Services/ServicesScreen';
import ChatDetailScreen from '../screens/Chat/ChatDetailScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';

// Import Payment screens
import PaymentScreen from '../screens/Payment/PaymentScreen';
import ChoosePaymentMethodScreen from '../screens/Payment/ChoosePaymentMethodScreen';
import PaymentInvoiceScreen from '../screens/Payment/PaymentInvoiceScreen';
import PaymentHistoryScreen from '../screens/Payment/PaymentHistoryScreen';
import SavedPaymentModesScreen from '../screens/Payment/SavedPaymentModesScreen';

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="Dashboard" component={TabNavigator} />

      <MainStack.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          headerShown: true,
          title: 'Task Details',
        }}
      />

      <MainStack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{
          headerShown: true,
          title: 'Chat',
        }}
      />

      <MainStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: 'Settings',
        }}
      />

      <MainStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          title: 'Notifications',
        }}
      />

      {/* Payment Screens */}
      <MainStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          headerShown: false, // Using custom Header component
        }}
      />

      <MainStack.Screen
        name="ChoosePaymentMethod"
        component={ChoosePaymentMethodScreen}
        options={{
          headerShown: false, // Using custom Header component
        }}
      />

      <MainStack.Screen
        name="PaymentInvoice"
        component={PaymentInvoiceScreen}
        options={{
          headerShown: false, // Using custom Header component
        }}
      />

      <MainStack.Screen
        name="PaymentHistory"
        component={PaymentHistoryScreen}
        options={{
          headerShown: false, // Using custom Header component
        }}
      />

      <MainStack.Screen
        name="SavedPaymentModes"
        component={SavedPaymentModesScreen}
        options={{
          headerShown: false, // Using custom Header component
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
