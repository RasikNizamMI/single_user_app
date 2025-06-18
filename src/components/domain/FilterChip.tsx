// FilterChip.tsx
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  style?: any;
  showRemove?: boolean;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  onPress,
  onRemove,
  style,
  showRemove = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive, style]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text
        style={[styles.chipText, active && styles.chipTextActive]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {label}
      </Text>

      {showRemove && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onRemove}
          hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
          <Text style={styles.removeIcon}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#EBF5FF',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  chipText: {
    fontSize: 14,
    color: '#4B5563',
    // maxWidth: 120,
  },
  chipTextActive: {
    color: '#3B82F6',
  },
  removeButton: {
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIcon: {
    fontSize: 18,
    color: '#3B82F6',
    fontWeight: 'bold',
  },
});

export default FilterChip;
