
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import theme from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'cancel' | 'outline' | 'text' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): StyleProp<ViewStyle> => {
    let buttonStyle: StyleProp<ViewStyle>[] = [
      styles.button,
      styles[`${size}Button`],
    ];

    switch (variant) {
      case 'primary':
        buttonStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyle.push(styles.secondaryButton);
        break;
        case 'cancel':
        buttonStyle.push(styles.cancelButton);
        break;
      case 'outline':
        buttonStyle.push(styles.outlineButton);
        break;
      case 'text':
        buttonStyle.push(styles.textButton);
        break;
      case 'danger':
        buttonStyle.push(styles.dangerButton);
        break;
      default:
        buttonStyle.push(styles.primaryButton);
    }

    if (disabled) {
      buttonStyle.push(styles.disabledButton);
    }

    return buttonStyle;
  };

  const getTextStyle = (): StyleProp<TextStyle> => {
    let buttonTextStyle: StyleProp<TextStyle>[] = [
      styles.buttonText,
      styles[`${size}Text`],
    ];

    switch (variant) {
      case 'primary':
        buttonTextStyle.push(styles.primaryText);
        break;
      case 'secondary':
        buttonTextStyle.push(styles.secondaryText);
        break;
        case 'cancel':
        buttonTextStyle.push(styles.cancelText);
        break;
      case 'outline':
        buttonTextStyle.push(styles.outlineText);
        break;
      case 'text':
        buttonTextStyle.push(styles.textOnlyText);
        break;
      case 'danger':
        buttonTextStyle.push(styles.dangerText);
        break;
      default:
        buttonTextStyle.push(styles.primaryText);
    }

    if (disabled) {
      buttonTextStyle.push(styles.disabledText);
    }

    return buttonTextStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'danger'
              ? '#FFFFFF'
              : '#2F80ED'
          }
          size="small"
        />
      ) : (
        <>
          {iconLeft}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {iconRight}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 36,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 44,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    height: 52,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
  },
  cancelButton: {
    backgroundColor: theme.colors.background.white,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  dangerButton: {
    backgroundColor: theme.colors.error,
  },
  disabledButton: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  buttonText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: theme.colors.background.white,
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.regular,
  },
  secondaryText: {
    color: theme.colors.background.white,
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.regular,
  },
  cancelText: {
    color: theme.colors.background.black,
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.regular,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  textOnlyText: {
    color: theme.colors.primary,
  },
  dangerText: {
    color: theme.colors.background.white,
  },
  disabledText: {
    color: theme.colors.background.white,
  },
});

export default Button;
