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
    const {focused} = props;

    // Replace with your actual icon sources
    const icons = {
      Home: Images.homeActive,
      Services: Images.servicesActive,
      Chat: Images.chatActive,
      More: Images.moreActive,
    };

    return (
      <View style={styles.tabContainer}>
        <View
          style={[
            styles.iconBackground,
            focused && styles.activeIconBackground,
          ]}>
          <Image
            source={icons[routeName]}
            style={[
              styles.tabIcon,
              {tintColor: focused ? '#007AFF' : '#8E8E93'},
            ]}
          />
          {routeName === 'Chat' && <View style={styles.chatBadge} />}
        </View>
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
        tabBarLabelPosition: 'below-icon',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: t('navigation.home')}}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{tabBarLabel: t('navigation.services')}}
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
    height: 95,
    backgroundColor: '#F8F9FA',
    borderTopWidth: 0,
    paddingBottom: 20,
    paddingTop: 25,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  tabBarItem: {
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    width: 60,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  activeIconBackground: {
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
  },
  tabIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  tabBarLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 0,
    textAlign: 'center',
  },
  chatBadge: {
    position: 'absolute',
    top: 20,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  badgeContent: {
    width: 10,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
});

export default TabNavigator;
