// FilterModal.tsx - Bottom sheet with category-based filtering
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Button from '../ui/Button';
import FilterChip from './FilterChip';
import theme from '../../constants/theme';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterCategory {
  category: string;
  options: FilterOption[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (selectedFilters: Record<string, string[]>) => void;
  filterCategories?: FilterCategory[];
  initialFilters?: Record<string, string[]>;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  filterCategories = [],
  initialFilters = {},
}) => {
  // Store the selected filters
  const [selectedFilters, setSelectedFilters] =
    useState<Record<string, string[]>>(initialFilters);

  // Store the previous filters for Cancel button
  const [previousFilters, setPreviousFilters] =
    useState<Record<string, string[]>>(initialFilters);

  // Store hidden chips (removed from view but still selected)
  const [hiddenChips, setHiddenChips] = useState<Record<string, string[]>>({});

  // Track the active category for the left sidebar
  const [activeCategory, setActiveCategory] = useState<string>(
    filterCategories.length > 0 ? filterCategories[0].category : '',
  );

  // When modal becomes visible, save current filters as previous state
  useEffect(() => {
    if (visible) {
      setSelectedFilters(initialFilters);
      setPreviousFilters(initialFilters);
      setHiddenChips({}); // Reset hidden chips when modal opens
      if (filterCategories.length > 0 && !activeCategory) {
        setActiveCategory(filterCategories[0].category);
      }
    }
  }, [visible, initialFilters, filterCategories, activeCategory]);

  // Clear all selected filters
  const handleClearAll = () => {
    setSelectedFilters({});
  };

  // Apply the selected filters and close modal
  const handleApply = () => {
    onApply(selectedFilters);
    onClose();
  };

  // Handle cancel button - restore previous filters and close
  const handleCancel = () => {
    setSelectedFilters(previousFilters);
    onClose();
  };

  // Toggle a filter option selection (multiselect for all categories)
  const toggleOption = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const categoryValues = prev[category] || [];
      const isSelected = categoryValues.includes(value);

      // Toggle selection (add if not selected, remove if already selected)
      const newValues = isSelected
        ? categoryValues.filter(v => v !== value)
        : [...categoryValues, value];

      return {
        ...prev,
        [category]: newValues,
      };
    });
  };

  // Check if an option is selected
  const isOptionSelected = (category: string, value: string) => {
    return (selectedFilters[category] || []).includes(value);
  };

  // Get all selected filter chips to show at the top (excluding hidden ones)
  const selectedFilterChips = Object.entries(selectedFilters).flatMap(
    ([category, values]) =>
      values
        .filter(value => {
          // Only show chips that aren't hidden
          const hiddenValuesForCategory = hiddenChips[category] || [];
          return !hiddenValuesForCategory.includes(value);
        })
        .map(value => {
          const categoryOptions =
            filterCategories.find(c => c.category === category)?.options || [];
          const optionLabel =
            categoryOptions.find(opt => opt.value === value)?.label || value;
          return {category, value, label: optionLabel};
        }),
  );

  // Remove a filter from selection
  const removeFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(v => v !== value),
    }));
  };

  // Hide a chip from view (but keep it selected)
  const hideChip = (category: string, value: string) => {
    setHiddenChips(prev => {
      const hiddenForCategory = prev[category] || [];
      return {
        ...prev,
        [category]: [...hiddenForCategory, value],
      };
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Selected filter chips - now in a height-constrained view with wrap */}

          {selectedFilterChips.length > 0 && (
            <View style={styles.chipsContainerWrapper}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.chipsScrollView}
                contentContainerStyle={styles.chipsContainer}>
                {selectedFilterChips.map((chip, index) => (
                  <FilterChip
                    key={`${chip.category}-${chip.value}-${index}`}
                    label={chip.label}
                    active={true}
                    showRemove={true}
                    onRemove={() => hideChip(chip.category, chip.value)}
                    style={styles.filterChip}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Two-column layout */}
          <View style={styles.twoColumnContainer}>
            {/* Left column - Categories */}
            <View style={styles.categoriesColumn}>
              {filterCategories.map(category => (
                <TouchableOpacity
                  key={category.category}
                  style={[
                    styles.categoryButton,
                    activeCategory === category.category &&
                      styles.activeCategoryButton,
                  ]}
                  onPress={() => setActiveCategory(category.category)}>
                  <View
                    style={[
                      styles.activeIndicator,
                      activeCategory === category.category &&
                        styles.activeIndicatorHighlight,
                    ]}
                  />
                  <Text style={styles.categoryText}>{category.category}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Right column - Options */}
            <ScrollView style={styles.optionsColumn}>
              {filterCategories
                .find(cat => cat.category === activeCategory)
                ?.options.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.optionRow}
                    onPress={() => toggleOption(activeCategory, option.value)}>
                    <View
                      style={[
                        styles.checkbox,
                        isOptionSelected(activeCategory, option.value) &&
                          styles.checkboxSelected,
                      ]}>
                      {isOptionSelected(activeCategory, option.value) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          {/* Action buttons */}
          <View style={styles.actions}>
            <Button
              title="Cancel"
              onPress={handleCancel}
              variant="cancel"
              style={styles.cancelButton}
            />
            <Button
              title="Apply"
              onPress={handleApply}
              style={[
                styles.applyButton,
                Object.values(selectedFilters).some(v => v.length > 0) &&
                  styles.applyButtonActive,
              ]}
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
    justifyContent: 'flex-end', // Bottom sheet
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    height: '80%',
    maxHeight: '90%',
  },
  chipsContainerWrapper: {},
  chipsScrollView: {
    // maxHeight: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.medium,
  },
  clearAllText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.medium,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    marginRight: 8,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  categoriesColumn: {
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  optionsColumn: {
    width: '70%',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  activeCategoryButton: {
    backgroundColor: '#F0F9FF',
  },
  activeIndicator: {
    width: 3,
    height: 20,
    borderRadius: 2,
    marginRight: 8,
  },
  activeIndicatorHighlight: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.medium,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionLabel: {
    color: theme.colors.text.placeholder,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    paddingBottom: 8,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  applyButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#E5E7EB',
  },
  applyButtonActive: {
    backgroundColor: theme.colors.primary,
  },
});

export default FilterModal;
