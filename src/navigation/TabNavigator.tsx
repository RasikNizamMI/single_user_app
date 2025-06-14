import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {TabParamList} from '../types/navigation';

// Import screens
import HomeScreen from '../screens/Home/HomeScreen';
import ServicesScreen from '../screens/Services/ServicesScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import MoreScreen from '../screens/More/MoreScreen';
import Images from '../constants/images';

const Tab = createBottomTabNavigator<TabParamList>();

interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const TabNavigator: React.FC = () => {
  const {t} = useTranslation();

  const getTabIcon = (routeName: keyof TabParamList, props: TabIconProps) => {
    const {focused, color} = props;

    // Replace with your actual icon sources
    const icons = {
      Home: Images.homeActive,
      Services: Images.tasksActive,
      Chat: Images.chatActive,
      More: Images.moreActive,
    };

    return (
      <View
        style={[styles.iconContainer, focused && styles.activeIconContainer]}>
        <Image
          source={icons[routeName]}
          style={[styles.tabIcon, {tintColor: color}]}
        />
        {(routeName === 'Chat') && (
          <View style={styles.notificationBadge} />
        )}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarItemStyle: styles.tabBarItem,
        tabBarIcon: props => getTabIcon(route.name, props),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: t('navigation.home')}}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{tabBarLabel: t('navigation.tasks')}}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{tabBarLabel: t('navigation.chat')}}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{tabBarLabel: t('navigation.more')}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingBottom: 10,
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabBarItem: {
    paddingVertical: 5,
  },
  iconContainer: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 12,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
});

export default TabNavigator;
