// screens/Observations/ObservationsScreen.tsx
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
import Icons from '../../constants/icons';
import SearchInput from '../../components/ui/SearchInput';

type ObservationStatus = 'new' | 'seen' | 'resolved';

interface Reporter {
  id: string;
  name: string;
  role: string;
  avatar: any;
}

interface Observation {
  id: string;
  title: string;
  reporter: Reporter;
  reportedDate: string;
  status: ObservationStatus;
  service: string;
  description?: string;
}

interface ObservationGroup {
  title: string;
  titleKey: string;
  observations: Observation[];
}

const ObservationsScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // Mock observation data
  const observationGroups: ObservationGroup[] = [
    {
      title: 'Today',
      titleKey: 'common.today',
      observations: [
        {
          id: '1',
          title: 'Bag is Missing',
          reporter: {
            id: '1',
            name: 'Guy Hawkins',
            role: 'Valet',
            avatar: require('../../assets/images/user.png'),
          },
          reportedDate: '10 Oct 2024, 10:20 PM',
          status: 'new',
          service: 'Trash Collection',
        },
      ],
    },
    {
      title: 'Yesterday',
      titleKey: 'observations.yesterday',
      observations: [
        {
          id: '2',
          title: 'Messy Trash',
          reporter: {
            id: '2',
            name: 'Ronald Richards',
            role: 'Valet',
            avatar: require('../../assets/images/user.png'),
          },
          reportedDate: '10 Oct 2024, 10:20 PM',
          status: 'new',
          service: 'Trash Collection',
        },
      ],
    },
    {
      title: 'Last 7 Days',
      titleKey: 'observations.last7Days',
      observations: [
        {
          id: '3',
          title: 'Bag is Missing',
          reporter: {
            id: '3',
            name: 'Brooklyn Simmons',
            role: 'Valet',
            avatar: require('../../assets/images/user.png'),
          },
          reportedDate: '10 Oct 2024, 10:20 PM',
          status: 'seen',
          service: 'Trash Collection',
        },
        {
          id: '4',
          title: 'Bag is not tagged properly',
          reporter: {
            id: '4',
            name: 'Jerome Bell',
            role: 'RM',
            avatar: require('../../assets/images/user.png'),
          },
          reportedDate: '10 Oct 2024, 10:20 PM',
          status: 'seen',
          service: 'Trash Collection',
        },
      ],
    },
    {
      title: 'Older',
      titleKey: 'observations.older',
      observations: [
        {
          id: '5',
          title: 'Bag is Missing',
          reporter: {
            id: '5',
            name: 'Savannah Nguyen',
            role: 'Valet',
            avatar: require('../../assets/images/user.png'),
          },
          reportedDate: '10 Oct 2024, 10:20 PM',
          status: 'seen',
          service: 'Trash Collection',
        },
      ],
    },
  ];

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

  const handleObservationPress = useCallback(
    (observation: Observation) => {
      navigation.navigate('SiteEvaluationDetails', {
        observationId: observation.id,
        observation,
      });
    },
    [navigation],
  );

  const getStatusColor = (status: ObservationStatus): string => {
    const statusColors = {
      new: theme.colors.primary,
      seen: theme.colors.success,
      resolved: theme.colors.success,
    };
    return statusColors[status];
  };

  const getStatusText = (status: ObservationStatus): string => {
    const statusTexts = {
      new: t('observations.status.new'),
      seen: t('observations.status.seen'),
      resolved: t('observations.status.resolved'),
    };
    return statusTexts[status];
  };

  const filteredGroups = observationGroups
    .map(group => ({
      ...group,
      observations: group.observations.filter(
        observation =>
          observation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          observation.reporter.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter(group => group.observations.length > 0);

  const renderObservation = (observation: Observation) => (
    <TouchableOpacity
      key={observation.id}
      style={styles.observationItem}
      onPress={() => handleObservationPress(observation)}
      activeOpacity={0.8}>
      <View style={styles.observationContent}>
        <View style={styles.observationHeader}>
          <Text style={styles.observationTitle}>{observation.title}</Text>
          <View
            style={[
              styles.statusBadge,
              {backgroundColor: getStatusColor(observation.status) + '20'},
            ]}>
            <Text
              style={[
                styles.statusText,
                {color: getStatusColor(observation.status)},
              ]}>
              {getStatusText(observation.status)}
            </Text>
          </View>
        </View>

        <View style={styles.reporterContainer}>
          <Image
            source={observation.reporter.avatar}
            style={styles.reporterAvatar}
          />
          <View style={styles.reporterInfo}>
            <Text style={styles.reporterName}>
              {observation.reporter.name} ({observation.reporter.role})
            </Text>
            <Text style={styles.reportedDate}>{observation.reportedDate}</Text>
          </View>
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderObservationGroup = (group: ObservationGroup) => (
    <View key={group.title} style={styles.observationGroup}>
      <Text style={styles.groupTitle}>{t(group.titleKey)}</Text>
      {group.observations.map(renderObservation)}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title={t('observations.title')} showBackButton />

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder={t('observations.search')}
          />
        </View>

        {/* Observations List */}
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
          {filteredGroups.map(renderObservationGroup)}
        </ScrollView>
      </View>
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : theme.spacing.md,
  },
  observationGroup: {
    marginBottom: theme.spacing.lg,
  },
  groupTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.medium,
  },
  observationItem: {
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadow.sm,
  },
  observationContent: {
    padding: theme.spacing.md,
  },
  observationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  observationTitle: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    ...theme.typography.caption,
    fontFamily: theme.typography.fontFamily.medium,
  },
  reporterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reporterAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  reporterInfo: {
    flex: 1,
  },
  reporterName: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: theme.spacing.xs,
  },
  reportedDate: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  arrowButton: {
    padding: theme.spacing.xs,
  },
  arrowIcon: {
    ...theme.typography.h2,
    color: theme.colors.text.secondary,
    fontWeight: '300',
  },
});

export default ObservationsScreen;
