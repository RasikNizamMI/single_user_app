// screens/Services/ServicesScreen.tsx
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/domain/Header';
import theme from '../../constants/theme';
import Icons from '../../constants/icons';

type ServiceStatus =
  | 'setOut'
  | 'started'
  | 'inProgress'
  | 'completed'
  | 'upcoming';

interface ServiceProvider {
  id: string;
  name: string;
  avatar: any; // Image source
  phone?: string;
}

interface ServiceItem {
  id: string;
  title: string;
  time: string;
  day: string;
  status: ServiceStatus;
  icon: any; // Image source
  iconColor: string;
  illustration: any; // Image source
  provider: ServiceProvider;
  progressSteps?: string[];
  currentStep?: number;
}

const ServicesScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  // Mock service data based on the images
  const services: ServiceItem[] = [
    {
      id: '1',
      title: t('services.trashCollection'),
      time: `${t('common.today')}, 08:00 AM`,
      day: t('services.schedule.mondayFriday'),
      status: 'inProgress',
      icon: Icons.trash,
      iconColor: theme.colors.primary,
      illustration: require('../../assets/images/trash-collection.png'), // You'll need to add this
      provider: {
        id: '1',
        name: 'Floyd Miles',
        avatar: require('../../assets/images/user.png'), // You'll need to add this
      },
      progressSteps: [
        t('services.status.setOut'),
        t('services.status.started'),
        t('services.status.inProgress'),
        t('services.status.completed'),
      ],
      currentStep: 2,
    },
    {
      id: '2',
      title: t('services.dogWalking'),
      time: `${t('common.tomorrow')}, 05:00 PM`,
      day: t('common.friday'),
      status: 'upcoming',
      icon: Icons.dogWalking,
      iconColor: theme.colors.status.upcomming,
      illustration: require('../../assets/images/dog-walking.png'), // You'll need to add this
      provider: {
        id: '2',
        name: 'Robert Fox',
        avatar: require('../../assets/images/user.png'), // You'll need to add this
      },
    },
    {
      id: '3',
      title: t('services.houseCleaning'),
      time: `${t('common.tomorrow')}, 02:00 PM`,
      day: t('common.friday'),
      status: 'upcoming',
      icon: Icons.houseCleaning,
      iconColor: theme.colors.status.upcomming,
      illustration: require('../../assets/images/house-cleaning.png'), // You'll need to add this
      provider: {
        id: '3',
        name: 'Robert Fox, Jerome Bell',
        avatar: require('../../assets/images/user.png'), // You'll need to add this
      },
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

  const handleNotificationPress = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  const handleServicePress = useCallback(
    (service: ServiceItem) => {
      // Navigate to service details
      navigation.navigate('Services', {taskId: service.id});
    },
    [navigation],
  );

  const handleCallProvider = useCallback((provider: ServiceProvider) => {
    console.log('Call provider:', provider.name);
    // Implement call functionality
  }, []);

  const handleChatProvider = useCallback(
    (provider: ServiceProvider) => {
      console.log('Chat with provider:', provider.name);
      // Navigate to chat
      navigation.navigate('ChatDetail', {chatId: provider.id});
    },
    [navigation],
  );

  const getStatusText = (status: ServiceStatus): string => {
    const statusMap = {
      setOut: t('services.status.setOut'),
      started: t('services.status.started'),
      inProgress: t('services.status.inProgress'),
      completed: t('services.status.completed'),
      upcoming: t('services.status.upcoming'),
    };
    return statusMap[status];
  };

  const getStatusColor = (status: ServiceStatus): string => {
    const colorMap = {
      setOut: theme.colors.status.pending,
      started: theme.colors.primary,
      inProgress: theme.colors.primary,
      completed: theme.colors.success,
      upcoming: theme.colors.status.upcomming,
    };
    return colorMap[status];
  };

  const renderProgressSteps = (steps: string[], currentStep: number) => (
    <View style={styles.progressContainer}>
      {steps.map((step, index) => (
        <View key={index} style={styles.progressStep}>
          <View
            style={[
              styles.progressDot,
              {
                backgroundColor:
                  index <= currentStep
                    ? theme.colors.primary
                    : theme.colors.border,
              },
            ]}
          />
          <Text
            style={[
              styles.progressText,
              {
                color:
                  index <= currentStep
                    ? theme.colors.primary
                    : theme.colors.text.secondary,
                fontFamily:
                  index === currentStep
                    ? theme.typography.fontFamily.medium
                    : theme.typography.fontFamily.regular,
              },
            ]}>
            {step}
          </Text>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.progressLine,
                {
                  backgroundColor:
                    index < currentStep
                      ? theme.colors.primary
                      : theme.colors.border,
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderServiceCard = (service: ServiceItem) => (
    <View key={service.id} style={styles.serviceCard}>
      {/* Illustration */}
      <TouchableOpacity
        style={styles.illustrationContainer}
        onPress={() => handleServicePress(service)}>
        <Image source={service.illustration} style={styles.illustration} />
        <View style={styles.dayBadge}>
          <Text style={styles.dayText}>{service.day}</Text>
        </View>
      </TouchableOpacity>

      {/* Service Info */}
      <View style={styles.serviceInfo}>
        <View style={styles.serviceHeader}>
          <View
            style={[
              styles.serviceIcon,
              {backgroundColor: service.iconColor + '20'},
            ]}>
            <Image
              source={service.icon}
              style={[styles.serviceIconImage, {tintColor: service.iconColor}]}
            />
          </View>
          <View style={styles.serviceTitleContainer}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceTime}>{service.time}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {backgroundColor: getStatusColor(service.status) + '20'},
            ]}>
            <Text
              style={[
                styles.statusText,
                {color: getStatusColor(service.status)},
              ]}>
              {getStatusText(service.status)}
            </Text>
          </View>
        </View>

        {/* Progress Steps (only for in-progress services) */}
        {service.progressSteps && service.currentStep !== undefined && (
          <View style={styles.progressSection}>
            {renderProgressSteps(service.progressSteps, service.currentStep)}
          </View>
        )}

        {/* Provider Info */}
        <View style={styles.providerContainer}>
          <View style={styles.providerInfo}>
            <Image
              source={service.provider.avatar}
              style={styles.providerAvatar}
            />
            <Text style={styles.providerName}>{service.provider.name}</Text>
          </View>
          <View style={styles.providerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleCallProvider(service.provider)}>
              <Image source={Icons.phone} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleChatProvider(service.provider)}>
              <Image source={Icons.chat} style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const rightIcons = [
    {
      iconName: 'notification' as keyof typeof Icons,
      onPress: handleNotificationPress,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title={t('services.title')} rightIcons={rightIcons} />

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
        {services.map(renderServiceCard)}
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
    paddingHorizontal: theme.spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : theme.spacing.md,
  },
  serviceCard: {
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadow.sm,
    overflow: 'hidden',
  },
  illustrationContainer: {
    position: 'relative',
    height: 200,
  },
  illustration: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dayBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: theme.colors.background.white + 'E6',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  dayText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  serviceInfo: {
    padding: theme.spacing.md,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  serviceIconImage: {
    width: 20,
    height: 20,
  },
  serviceTitleContainer: {
    flex: 1,
  },
  serviceTitle: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: theme.spacing.xs,
  },
  serviceTime: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
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
  progressSection: {
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: theme.spacing.xs,
  },
  progressText: {
    ...theme.typography.caption,
    textAlign: 'center',
  },
  progressLine: {
    position: 'absolute',
    top: 6,
    left: '50%',
    right: '-50%',
    height: 2,
    zIndex: -1,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  providerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: theme.spacing.sm,
  },
  providerName: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  providerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
  actionIcon: {
    width: 18,
    height: 18,
    tintColor: theme.colors.text.primary,
  },
});

export default ServicesScreen;
