import React, {Ref} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import theme from '../../constants/theme';

// Define IconName type based on your Icons object
type IconName = keyof typeof Icons;

// Define proper types for right icons
interface RightIconConfig {
  iconName: IconName;
  onPress: () => void;
  ref?: Ref<TouchableOpacity>;
}

// Main Header component props interface
interface HeaderProps {
  title: string;
  subTitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightIcons?: RightIconConfig[];
  avatar?: ImageSourcePropType; // Proper React Native image source type
  isOnline?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subTitle,
  showBackButton = false,
  onBackPress,
  rightIcons = [],
  avatar,
  isOnline = false,
}) => {
  const navigation = useNavigation();

  const handleBackPress = (): void => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
            <Image source={Icons.back} style={styles.backIcon} />
          </TouchableOpacity>
        )}

        {/* Avatar section - for chat screens */}
        {avatar && (
          <View style={styles.avatarContainer}>
            <Image source={avatar} style={styles.avatar} />
            {isOnline && <View style={styles.onlineIndicator} />}
          </View>
        )}

        <View
          style={[
            styles.textContainer,
            !showBackButton && !avatar && {marginLeft: 0},
          ]}>
          <Text style={styles.title}>{title}</Text>
          {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}
        </View>

        <View style={styles.iconsContainer}>
          {rightIcons.map(({iconName, onPress, ref}, index) => (
            <TouchableOpacity
              ref={ref}
              key={index}
              onPress={onPress}
              style={styles.iconButton}>
              <Image source={Icons[iconName]} style={styles.icon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + theme.spacing.xs, // 12px (8+4)
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: theme.spacing.sm + theme.spacing.xs, // 12px
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: theme.colors.text.primary,
  },
  textContainer: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  subTitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.xs,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: theme.colors.text.primary,
  },
  // Chat header styles
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing.sm + theme.spacing.xs, // 12px
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: theme.colors.success,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.background.white,
    top: 0,
    right: 0,
  },
});

export default Header;
