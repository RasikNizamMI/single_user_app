// screens/Concerns/ConcernsScreen.tsx
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  RefreshControl,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/domain/Header';
import theme from '../../constants/theme';
import SearchInput from '../../components/ui/SearchInput';
import FilterModal from '../../components/domain/FilterModal';
import Icons from '../../constants/icons';

type ConcernStatus = 'open' | 'closed';

interface Concern {
  id: string;
  title: string;
  service: string;
  serviceDate: string;
  reportedDate: string;
  status: ConcernStatus;
  group: 'today' | 'yesterday' | 'last7days' | 'older';
}

interface FilterCategory {
  id: string;
  title: string;
  options: Array<{id: string; label: string}>;
}

const ConcernsScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'open' | 'closed'>(
    'open',
  );
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  // Mock concerns data with proper grouping
  const concerns: Concern[] = [
    // Open concerns
    {
      id: '1',
      title: 'Bag is torn',
      service: 'Trash Collection',
      serviceDate: '09 Oct 2024',
      reportedDate: '10 Oct 2024',
      status: 'open',
      group: 'today',
    },
    {
      id: '2',
      title: 'Bag is torn',
      service: 'Trash Collection',
      serviceDate: '09 Oct 2024',
      reportedDate: '10 Oct 2024',
      status: 'open',
      group: 'today',
    },
    {
      id: '3',
      title: 'Bag is torn',
      service: 'Trash Collection',
      serviceDate: '09 Oct 2024',
      reportedDate: '10 Oct 2024',
      status: 'open',
      group: 'yesterday',
    },
    // Closed concerns
    {
      id: '4',
      title: 'Bag is torn',
      service: 'Trash Collection',
      serviceDate: '09 Oct 2024',
      reportedDate: '11 Oct 2024',
      status: 'closed',
      group: 'today',
    },
    {
      id: '5',
      title: 'Bag is torn',
      service: 'Trash Collection',
      serviceDate: '09 Oct 2024',
      reportedDate: '11 Oct 2024',
      status: 'closed',
      group: 'today',
    },
    {
      id: '6',
      title: 'Bag is torn',
      service: 'Trash Collection',
      serviceDate: '09 Oct 2024',
      reportedDate: '11 Oct 2024',
      status: 'closed',
      group: 'today',
    },
    {
      id: '7',
      title: 'Bag is torn',
      service: 'Trash Collection',
      serviceDate: '09 Oct 2024',
      reportedDate: '11 Oct 2024',
      status: 'closed',
      group: 'today',
    },
  ];

  const filterCategories: FilterCategory[] = [
    {
      id: 'service',
      title: t('concerns.filters.service'),
      options: [
        {id: 'trash', label: t('services.trashCollection')},
        {id: 'cleaning', label: t('services.houseCleaning')},
        {id: 'lawn', label: t('services.lawnCare')},
      ],
    },
    {
      id: 'status',
      title: t('concerns.filters.status'),
      options: [
        {id: 'open', label: t('concerns.status.open')},
        {id: 'closed', label: t('concerns.status.closed')},
      ],
    },
  ];

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleConcernPress = useCallback(
    (concern: Concern) => {
      navigation.navigate('ConcernDetails', {
        concernId: concern.id,
        concern,
      });
    },
    [navigation],
  );

  const handleStatusChange = (status: 'open' | 'closed') => {
    setSelectedStatus(status);
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleAddPress = () => {
    console.log('Add new concern');
    // Navigate to add concern screen
  };

  const handleApplyFilter = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters);
    setShowFilterModal(false);
  };

  const filteredConcerns = concerns.filter(concern => {
    const matchesSearch =
      concern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concern.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = concern.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Group filtered concerns
  const groupedConcerns = {
    today: filteredConcerns.filter(c => c.group === 'today'),
    yesterday: filteredConcerns.filter(c => c.group === 'yesterday'),
    last7days: filteredConcerns.filter(c => c.group === 'last7days'),
    older: filteredConcerns.filter(c => c.group === 'older'),
  };

  const getGroupTitle = (group: string) => {
    const titles = {
      today: t('common.today'),
      yesterday: t('observations.yesterday'),
      last7days: t('observations.last7Days'),
      older: t('observations.older'),
    };
    return titles[group] || group;
  };

  const renderConcern = (concern: Concern) => (
    <TouchableOpacity
      key={concern.id}
      style={styles.concernItem}
      onPress={() => handleConcernPress(concern)}
      activeOpacity={0.8}>
      <View style={styles.concernHeader}>
        <Text style={styles.concernTitle}>{concern.title}</Text>
        <Text style={styles.reportedDate}>{concern.reportedDate}</Text>
      </View>

      <View style={styles.concernDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t('concerns.service')}:</Text>
          <Text style={styles.detailValue}>{concern.service}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t('concerns.serviceDate')}:</Text>
          <Text style={styles.detailValue}>{concern.serviceDate}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.arrowButton}>
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderGroup = (groupKey: string, concerns: Concern[]) => {
    if (concerns.length === 0) return null;

    return (
      <View key={groupKey} style={styles.groupContainer}>
        <Text style={styles.groupTitle}>{getGroupTitle(groupKey)}</Text>
        {concerns.map(renderConcern)}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title={t('concerns.title')} showBackButton />

      <View style={styles.content}>
        {/* Search Bar with Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchRow}>
            <View style={styles.searchInputWrapper}>
              <SearchInput
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholder={t('concerns.search')}
              />
            </View>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleFilterPress}>
              <Image source={Icons.filterIcon} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Filter Tabs */}
        <View style={styles.statusContainer}>
          <View style={styles.statusTabs}>
            <TouchableOpacity
              style={[
                styles.statusTab,
                selectedStatus === 'open' && styles.statusTabActive,
              ]}
              onPress={() => handleStatusChange('open')}>
              <Text
                style={[
                  styles.statusTabText,
                  selectedStatus === 'open' && styles.statusTabTextActive,
                ]}>
                {t('concerns.status.open')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.statusTab,
                selectedStatus === 'closed' && styles.statusTabActive,
              ]}
              onPress={() => handleStatusChange('closed')}>
              <Text
                style={[
                  styles.statusTabText,
                  selectedStatus === 'closed' && styles.statusTabTextActive,
                ]}>
                {t('concerns.status.closed')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Concerns List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          }>
          {renderGroup('today', groupedConcerns.today)}
          {renderGroup('yesterday', groupedConcerns.yesterday)}
          {renderGroup('last7days', groupedConcerns.last7days)}
          {renderGroup('older', groupedConcerns.older)}
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {showFilterModal && (
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={handleApplyFilter}
          filterCategories={filterCategories}
          initialFilters={selectedFilters}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  searchInputWrapper: {
    flex: 1,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.text.inverse,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.sm,
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: theme.colors.primary,
  },
  statusContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  statusTabs: {
    flexDirection: 'row',
    width: 200,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xs,
  },
  statusTab: {
    flex: 1,
    backgroundColor: theme.colors.text.inverse,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  statusTabActive: {
    backgroundColor: theme.colors.primary,
  },
  statusTabText: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  statusTabTextActive: {
    color: theme.colors.text.inverse,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: 100, // Space for FAB
  },
  groupContainer: {
    marginBottom: theme.spacing.lg,
  },
  groupTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: theme.spacing.md,
  },
  concernItem: {
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadow.sm,
    position: 'relative',
  },
  concernHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  concernTitle: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  reportedDate: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  concernDetails: {
    marginBottom: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  detailLabel: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    minWidth: 100,
  },
  detailValue: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    flex: 1,
  },
  arrowButton: {
    position: 'absolute',
    right: theme.spacing.md,
    top: '50%',
    transform: [{translateY: -12}],
    padding: theme.spacing.xs,
  },
  arrowIcon: {
    ...theme.typography.h2,
    color: theme.colors.text.secondary,
    fontWeight: '300',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.md,
  },
  fabIcon: {
    fontSize: 24,
    color: theme.colors.text.inverse,
    fontFamily: theme.typography.fontFamily.medium,
  },
});

export default ConcernsScreen;
