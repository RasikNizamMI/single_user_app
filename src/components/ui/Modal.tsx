import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Button from './Button';
import Icons from '../../constants/icons';
import theme from '../../constants/theme';

interface CustomModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  icon?: ImageSourcePropType;
  iconBackgroundColor?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonPress?: () => void;
  onSecondaryButtonPress?: () => void;
  onClose?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  message,
  icon,
  iconBackgroundColor,
  primaryButtonText = 'OK',
  secondaryButtonText,
  onPrimaryButtonPress,
  onSecondaryButtonPress,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {onClose && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Image source={Icons.close} style={styles.closeIcon} />
            </TouchableOpacity>
          )}

          {icon && (
            <View
              style={[
                styles.iconContainer,
                iconBackgroundColor && {
                  backgroundColor: iconBackgroundColor,
                  borderRadius: 24,
                },
              ]}>
              <Image source={icon} style={styles.iconImage} />
            </View>
          )}

          {title && <Text style={styles.title}>{title}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}

          <View style={styles.buttonContainer}>
  {secondaryButtonText && (
    <Button
      title={secondaryButtonText}
      onPress={onSecondaryButtonPress ?? onClose ?? (() => {})}
      variant="secondary"
      style={styles.secondaryButton}
    />
  )}

<Button
  title={primaryButtonText}
  onPress={onPrimaryButtonPress ?? onClose ?? (() => {})}
  style={
    secondaryButtonText
      ? styles.primaryButtonWithSecondary
      : styles.primaryButton
  }
/> 
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 335,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: '#717C7E',
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.bold,
  },
  message: {
    color: theme.colors.text.subTitle,
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    width: '100%',
  },
  primaryButtonWithSecondary: {
    flex: 1,
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    marginRight: 8,
  },
});

export default CustomModal;