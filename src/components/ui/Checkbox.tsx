import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icons from '../../constants/icons';
import {typography} from '../../constants/typography';
import theme from '../../constants/theme';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
  labelComponent?: React.ReactNode;
  error?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  labelComponent,
  error,
  style,
  disabled = false,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.row}
        onPress={onToggle}
        activeOpacity={0.7}
        disabled={disabled}>
        <View
          style={[
            styles.checkbox,
            checked && styles.checkboxChecked,
            disabled && styles.checkboxDisabled,
          ]}>
          {checked && (
            <Image
              source={Icons.checkIcon}
              style={styles.checkIcon}
              resizeMode="contain"
            />
          )}
        </View>
        {label && <Text style={styles.label}>{label}</Text>}
        {labelComponent}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CDD7DA',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#2F80ED',
    borderColor: '#2F80ED',
  },
  checkboxDisabled: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  label: {
    ...typography.body,
    color: '#717C7E',
    flex: 1,
  },
  errorText: {
    ...typography.caption,
    color: theme.colors.error,
    marginTop: 4,
    marginLeft: 30,
  },
});

export default Checkbox;