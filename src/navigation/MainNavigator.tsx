import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackParamList} from '../types/navigation';
import TabNavigator from './TabNavigator';

// Import additional screens that are not part of tabs
import ServicesScreen from '../screens/Services/ServicesScreen';
import ChatDetailScreen from '../screens/Chat/ChatDetailScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';

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
    </MainStack.Navigator>
  );
};

export default MainNavigator;