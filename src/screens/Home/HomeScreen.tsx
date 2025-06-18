import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  Alert,
  Platform,
  StatusBar,
  Switch,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/domain/Header';
import Icons from '../../constants/icons';
import Images from '../../constants/images';
import theme from '../../constants/theme'; // Import your theme

const {width: screenWidth} = Dimensions.get('window');

// Types
type IconName = keyof typeof Icons;
type ImageSource = keyof typeof Images;

interface ServiceOverview {
  id: string;
  title: string;
  titleKey: string;
  icon: IconName;
  thisMonth: string;
  upcoming: {
    date: string;
    time: string;
  };
  color: string;
}

interface PaymentInfo {
  count: number;
  amount: number;
}

interface StatsItem {
  title: string;
  titleKey: string;
  total: number;
  new: number;
  resolved?: number;
  icon: IconName;
  color: string;
}

interface MoreService {
  id: string;
  title: string;
  titleKey: string;
  description: string;
  descriptionKey: string;
  image: ImageSource;
  backgroundColor: string;
}

interface RightIconConfig {
  iconName: IconName;
  onPress: () => void;
  badge?: number;
}

const HomeScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  // State management
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with actual API calls - Updated with theme colors
  const [servicesOverview] = useState<ServiceOverview[]>([
    {
      id: '1',
      title: 'Trash Collection',
      titleKey: 'services.trashCollection',
      icon: 'trash' as IconName,
      thisMonth: '22/26',
      upcoming: {
        date: 'Oct 25',
        time: '9:00 AM',
      },
      color: theme.colors.primary,
    },
    {
      id: '2',
      title: 'House Cleaning',
      titleKey: 'services.houseCleaning',
      icon: 'cleaning' as IconName,
      thisMonth: '8/12',
      upcoming: {
        date: 'Oct 26',
        time: '10:00 AM',
      },
      color: theme.colors.status.ongoing,
    },
  ]);

  const [paymentsInfo] = useState<PaymentInfo>({
    count: 2,
    amount: 45.0,
  });

  const [stats] = useState<StatsItem[]>([
    {
      title: 'Observations',
      titleKey: 'stats.observations',
      total: 16,
      new: 2,
      icon: 'observations' as IconName,
      color: theme.colors.status.ongoing,
    },
    {
      title: 'Concerns',
      titleKey: 'stats.concerns',
      total: 14,
      new: 0,
      resolved: 12,
      icon: 'concerns' as IconName,
      color: theme.colors.warning,
    },
  ]);

  const [moreServices] = useState<MoreService[]>([
    {
      id: '1',
      title: 'House Cleaning',
      titleKey: 'services.houseCleaning',
      description: 'Professional cleaning services',
      descriptionKey: 'services.houseCleaningDescription',
      image: 'houseCleaning' as ImageSource,
      backgroundColor: theme.colors.primary,
    },
    {
      id: '2',
      title: 'Lawn Care',
      titleKey: 'services.lawnCare',
      description: 'Maintain your garden',
      descriptionKey: 'services.lawnCareDescription',
      image: 'lawnCare' as ImageSource,
      backgroundColor: theme.colors.success,
    },
  ]);

  // Handlers
  const onRefresh = useCallback(async (): Promise<void> => {
    setRefreshing(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add your actual API calls here
    } catch (error) {
      console.error('Refresh error:', error);
      setError(t('errors.refreshFailed'));
      Alert.alert(t('common.error'), t('errors.refreshFailed'));
    } finally {
      setRefreshing(false);
    }
  }, [t]);

  const handleNotificationPress = useCallback((): void => {
    console.log('Navigate to notifications');
    // Navigate to notifications screen
  }, []);

  const handleAvailabilityChange = useCallback(
    async (available: boolean): Promise<void> => {
      setIsLoading(true);
      try {
        setIsAvailable(available);
        // API call to update availability
        console.log('Availability changed:', available);
        // You can add actual API call here
      } catch (error) {
        console.error('Availability update error:', error);
        setError(t('errors.availabilityUpdateFailed'));
        Alert.alert(t('common.error'), t('errors.availabilityUpdateFailed'));
        // Revert the change
        setIsAvailable(!available);
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  const handleServicePress = useCallback((serviceId: string): void => {
    console.log('Service pressed:', serviceId);
    // Navigate to service details
  }, []);

  const handlePaymentPress = useCallback((): void => {
    navigation.navigate('Payment');
  }, []);

  const handleStatsPress = useCallback(
    (type: string): void => {
      console.log('Stats pressed:', type);
      if (type === 'Observations') {
        navigation.navigate('Observations');
      } else if (type === 'Concerns') {
        navigation.navigate('Concerns');
      }
      // Navigate to respective screen
    },
    [navigation],
  );

  const handleMoreServicePress = useCallback((serviceId: string): void => {
    console.log('More service pressed:', serviceId);
    // Navigate to service booking
  }, []);

  // Render methods
  const renderAvailabilitySection = (): React.ReactElement => (
    <View style={[styles.availabilityContainer, theme.shadow.sm]}>
      <View style={styles.availabilityContent}>
        <View style={styles.availabilityTextContainer}>
          <Text style={styles.availabilityLabel}>
            {t('home.availability.label')}
          </Text>
        </View>
        <Switch
          value={isAvailable}
          onValueChange={handleAvailabilityChange}
          disabled={isLoading}
          trackColor={{
            false: '#E5E5EA', // Light gray for inactive state
            true: '#34C759', // Green for active state
          }}
          thumbColor={theme.colors.background.white}
          ios_backgroundColor="#E5E5EA"
          style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}} // Make switch smaller
        />
      </View>
    </View>
  );

  const renderServiceCard = (
    service: ServiceOverview,
    index: number,
  ): React.ReactElement => (
    <TouchableOpacity
      key={service.id}
      style={[styles.serviceCard, theme.shadow.md]}
      onPress={() => handleServicePress(service.id)}
      activeOpacity={0.9}>
      <View style={styles.serviceHeader}>
        <View
          style={[styles.serviceIcon, {backgroundColor: service.color + '20'}]}>
          <Image
            source={Icons[service.icon]}
            style={[styles.serviceIconImage, {tintColor: service.color}]}
          />
        </View>
        <Text style={styles.serviceTitle}>{t(service.titleKey)}</Text>
      </View>

      <View style={styles.serviceContent}>
        <View style={styles.serviceMetric}>
          <Text style={styles.metricLabel}>{t('home.thisMonth')}</Text>
          <Text style={styles.metricValue}>{service.thisMonth}</Text>
        </View>

        <View style={styles.serviceMetric}>
          <Text style={styles.metricLabel}>{t('home.upcoming')}</Text>
          <Text style={styles.metricValue}>
            {service.upcoming.date}, {service.upcoming.time}
          </Text>
        </View>
      </View>

      <View style={styles.paginationContainer}>
        {servicesOverview.map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  dotIndex === index
                    ? theme.colors.primary
                    : theme.colors.border,
              },
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderPaymentCard = (): React.ReactElement => (
    <TouchableOpacity
      style={[styles.paymentCard, theme.shadow.md]}
      onPress={handlePaymentPress}
      activeOpacity={0.9}>
      <View style={styles.paymentHeader}>
        <View
          style={[
            styles.paymentIcon,
            {backgroundColor: theme.colors.primary + '20'},
          ]}>
          <Image
            source={Icons.payment}
            style={[styles.paymentIconImage, {tintColor: theme.colors.primary}]}
          />
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentTitle}>
            {t('home.payments.due', {count: paymentsInfo.count})}
          </Text>
          <Text style={styles.paymentAmount}>
            ${paymentsInfo.amount.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>{t('common.viewDetails')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderStatsCard = (
    stat: StatsItem,
    index: number,
  ): React.ReactElement => (
    <TouchableOpacity
      key={stat.title}
      style={[styles.statsCard, theme.shadow.sm]}
      onPress={() => handleStatsPress(stat.title)}
      activeOpacity={0.9}>
      <View style={[styles.statsIcon, {backgroundColor: stat.color + '20'}]}>
        <Image
          source={Icons[stat.icon]}
          style={[styles.statsIconImage, {tintColor: stat.color}]}
        />
      </View>

      <Text style={styles.statsTitle}>{t(stat.titleKey)}</Text>

      <View style={styles.statsMetrics}>
        <View style={styles.statsMetric}>
          <Text style={styles.statsLabel}>{t('stats.total')}</Text>
          <Text style={styles.statsValue}>{stat.total}</Text>
        </View>

        <View style={styles.statsMetric}>
          <Text style={styles.statsLabel}>
            {stat.resolved !== undefined ? t('stats.resolved') : t('stats.new')}
          </Text>
          <Text style={styles.statsValue}>
            {stat.resolved !== undefined ? stat.resolved : stat.new}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMoreServiceCard = (service: MoreService): React.ReactElement => (
    <TouchableOpacity
      key={service.id}
      style={[
        styles.moreServiceCard,
        {backgroundColor: service.backgroundColor},
        theme.shadow.md,
      ]}
      onPress={() => handleMoreServicePress(service.id)}
      activeOpacity={0.9}>
      <View style={styles.moreServiceContent}>
        <Text style={styles.moreServiceTitle}>{t(service.titleKey)}</Text>
        <Text style={styles.moreServiceDescription}>
          {t(service.descriptionKey)}
        </Text>
      </View>

      <View style={styles.moreServiceImageContainer}>
        <Image source={Images[service.image]} style={styles.moreServiceImage} />
      </View>
    </TouchableOpacity>
  );

  const rightIcons: RightIconConfig[] = [
    {
      iconName: 'notification',
      onPress: handleNotificationPress,
      badge: 2,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header
        title={t('home.welcome')}
        subTitle={'Andrew Roberts'}
        rightIcons={rightIcons}
      />

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
        {/* Availability Section */}
        <View style={styles.section}>{renderAvailabilitySection()}</View>

        {/* Services Overview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.servicesOverview')}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / (screenWidth - 32),
              );
              setCurrentServiceIndex(index);
            }}
            style={styles.servicesScrollView}>
            {servicesOverview.map((service, index) =>
              renderServiceCard(service, index),
            )}
          </ScrollView>
        </View>

        {/* Payments Section */}
        <View style={styles.section}>{renderPaymentCard()}</View>

        {/* Stats Section */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => renderStatsCard(stat, index))}
          </View>
        </View>

        {/* More Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.moreServices')}</Text>
          {moreServices.map(renderMoreServiceCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  section: {
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },

  // Availability Section
  availabilityContainer: {
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  availabilityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: theme.spacing.md,
  },
  availabilityTextContainer: {
    flex: 1,
  },
  availabilityLabel: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },

  // Service Cards
  servicesScrollView: {
    marginHorizontal: -theme.spacing.md,
  },
  serviceCard: {
    width: screenWidth - 32,
    marginHorizontal: theme.spacing.md,
    padding: 20,
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceIconImage: {
    width: 24,
    height: 24,
  },
  serviceTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    flex: 1,
  },
  serviceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceMetric: {
    flex: 1,
  },
  metricLabel: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  metricValue: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  // Payment Card
  paymentCard: {
    padding: 20,
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentIconImage: {
    width: 24,
    height: 24,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  paymentAmount: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
  },
  viewDetailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewDetailsText: {
    ...theme.typography.body2,
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },

  // Stats Cards
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsCard: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    marginHorizontal: 4,
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statsIconImage: {
    width: 20,
    height: 20,
  },
  statsTitle: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: 12,
  },
  statsMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsMetric: {
    alignItems: 'center',
  },
  statsLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  statsValue: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },

  // More Services
  moreServiceCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: theme.borderRadius.lg,
    marginBottom: 12,
    alignItems: 'center',
  },
  moreServiceContent: {
    flex: 1,
  },
  moreServiceTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.inverse,
    marginBottom: 4,
  },
  moreServiceDescription: {
    ...theme.typography.body2,
    color: theme.colors.text.inverse + 'CC',
  },
  moreServiceImageContainer: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  moreServiceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default HomeScreen;
