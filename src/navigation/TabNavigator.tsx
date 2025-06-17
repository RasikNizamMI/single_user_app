// navigation/TabNavigator.tsx
import React from 'react';
import {Image, StyleSheet, View, Text, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import HomeScreen from '../screens/Home/HomeScreen';
import ServicesScreen from '../screens/Services/ServicesScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import MoreScreen from '../screens/More/MoreScreen';
import Images from '../constants/images';
import theme from '../constants/theme'; // Import your theme
import {TabParamList} from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

interface TabIconProps {
  routeName: keyof TabParamList;
  focused: boolean;
  badge?: number;
}

const TabNavigator: React.FC = () => {
  const {t} = useTranslation();

  // Tab configuration with badges
  const tabConfig = {
    Home: {badge: 0},
    Services: {badge: 0},
    Chat: {badge: 3}, // Example: 3 unread messages
    More: {badge: 0},
  };

  const renderTabIcon = ({routeName, focused, badge}: TabIconProps) => {
    const icons = {
      Home: focused ? Images.homeActive : Images.homeActive,
      Services: focused ? Images.servicesActive : Images.servicesActive,
      Chat: focused ? Images.chatActive : Images.chatActive,
      More: focused ? Images.moreActive : Images.moreActive,
    };

    const iconColor = focused
      ? theme.colors.primary
      : theme.colors.text.secondary;

    return (
      <View style={styles.tabIconContainer}>
        <View style={styles.iconWrapper}>
          <Image
            source={icons[routeName]}
            style={[
              styles.tabIcon,
              {tintColor: iconColor},
              focused && styles.focusedIcon,
            ]}
          />
          {badge && badge > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {badge > 99 ? '99+' : badge.toString()}
              </Text>
            </View>
          )}
        </View>

        {/* Active indicator dot */}
        {/* {focused && <View style={styles.activeIndicator} />} */}
      </View>
    );
  };

  const renderTabLabel = (label: string, focused: boolean) => {
    return (
      <Text
        style={[
          styles.tabLabel,
          {
            color: focused ? theme.colors.primary : theme.colors.text.secondary,
            fontFamily: focused
              ? theme.typography.fontFamily.medium
              : theme.typography.fontFamily.regular,
          },
        ]}
        numberOfLines={1}>
        {label}
      </Text>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabel: ({focused}) =>
          renderTabLabel(t(`navigation.${route.name.toLowerCase()}`), focused),
        tabBarIcon: ({focused}) =>
          renderTabIcon({
            routeName: route.name,
            focused,
            badge: tabConfig[route.name]?.badge,
          }),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: [styles.tabBar, theme.shadow.md],
        tabBarLabelStyle: styles.tabLabelStyle,
        tabBarItemStyle: styles.tabBarItem,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarAccessibilityLabel: t('navigation.home'),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarAccessibilityLabel: t('navigation.services'),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarAccessibilityLabel: t('navigation.chat'),
          tabBarBadge:
            tabConfig.Chat.badge > 0 ? tabConfig.Chat.badge : undefined,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarAccessibilityLabel: t('navigation.more'),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 88 : 70,
    paddingTop: theme.spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 34 : theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.background.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  tabBarItem: {
    paddingVertical: theme.spacing.xs,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  focusedIcon: {
    width: 26,
    height: 26,
  },
  tabLabel: {
    fontSize: theme.typography.fontSize.xs,
    marginTop: theme.spacing.xs,
    letterSpacing: -0.1,
  },
  tabLabelStyle: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    marginTop: theme.spacing.xs,
    color: theme.colors.text.secondary,
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xs,
    borderWidth: 2,
    borderColor: theme.colors.background.white,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default TabNavigator;
