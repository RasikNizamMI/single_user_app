// screens/Concerns/ConcernDetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useRoute, useNavigation} from '@react-navigation/native';
import Header from '../../components/domain/Header';
import theme from '../../constants/theme';

const {width: screenWidth} = Dimensions.get('window');

interface TaskDetails {
  serviceId: string;
  serviceName: string;
  serviceDate: string;
  jobsite: string;
  area: string;
  unit: string;
}

interface RouteParams {
  concernId: string;
  concern: {
    id: string;
    title: string;
    service: string;
    serviceDate: string;
    reportedDate: string;
    status: 'open' | 'closed';
  };
}

const ConcernDetailsScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const {concern} = route.params as RouteParams;

  // Mock detailed data
  const concernDetails = {
    ...concern,
    raisedOn: '10 Oct 2024, 10:20 PM',
    description:
      "One garbage bag was left uncollected during today's waste pickup. Please ensure it is retrieved promptly",
    attachedImages: [
      require('../../assets/images/user.png'),
      require('../../assets/images/user.png'),
      require('../../assets/images/user.png'),
    ],
    taskDetails: {
      serviceId: 'T-101-20250221',
      serviceName: 'Trash Collection',
      serviceDate: '9 Oct 2024',
      jobsite: 'Salão de festas',
      area: 'Spring Valley',
      unit: 'B-105',
    } as TaskDetails,
    resolution:
      concern.status === 'closed'
        ? {
            resolvedOn: '11 Oct 2024',
            note: 'Reviewed the concern raised regarding the left-behind bag. Attached images confirm the bag has been collected and the area is clear.',
            attachedImages: [
              require('../../assets/images/user.png'),
              require('../../assets/images/user.png'),
              require('../../assets/images/user.png'),
            ],
          }
        : null,
  };

  const getStatusColor = (status: string) => {
    return status === 'open' ? theme.colors.primary : theme.colors.success;
  };

  const getStatusText = (status: string) => {
    return status === 'open'
      ? t('concerns.status.open')
      : t('concerns.status.closed');
  };

  const handleImagePress = (imageIndex: number, isResolution = false) => {
    console.log(
      'View image at index:',
      imageIndex,
      'Resolution:',
      isResolution,
    );
    // Navigate to image viewer or open full screen
  };

  const renderAttachedImages = (images: any[], isResolution = false) => (
    <View style={styles.imagesGrid}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          style={styles.imageContainer}
          onPress={() => handleImagePress(index, isResolution)}
          activeOpacity={0.8}>
          <Image source={image} style={styles.attachedImage} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTaskDetailsRow = (label: string, value: string) => (
    <View style={styles.taskDetailRow}>
      <View style={styles.taskDetailColumn}>
        <Text style={styles.taskDetailLabel}>{label}</Text>
        <Text style={styles.taskDetailValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title={t('concerns.detailTitle')} showBackButton />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {/* Main Content Card */}
        <View style={styles.mainCard}>
          {/* Concern Header */}
          <View style={styles.concernHeader}>
            <Text style={styles.concernTitle}>{concernDetails.title}</Text>
            <View
              style={[
                styles.statusBadge,
                {backgroundColor: getStatusColor(concernDetails.status) + '20'},
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {color: getStatusColor(concernDetails.status)},
                ]}>
                {getStatusText(concernDetails.status)}
              </Text>
            </View>
          </View>

          <Text style={styles.raisedDate}>
            {t('concerns.raisedOn')}: {concernDetails.raisedOn}
          </Text>

          {/* Description Section */}
          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionTitle}>{t('concerns.description')}</Text>
            <Text style={styles.description}>{concernDetails.description}</Text>
          </View>

          {/* Attached Images Section */}
          <View style={styles.sectionSpacing}>
            <Text style={styles.sectionTitle}>
              {t('concerns.attachedImages')}
            </Text>
            {renderAttachedImages(concernDetails.attachedImages)}
          </View>

          {/* Task Details Section */}
          {concern.status === 'open' && (
            <View style={styles.sectionSpacing}>
              <Text style={styles.sectionTitle}>
                {t('concerns.taskDetails')}
              </Text>
              <View style={styles.taskDetailsGrid}>
                <View style={styles.taskDetailsRow}>
                  {renderTaskDetailsRow(
                    t('concerns.serviceId'),
                    concernDetails.taskDetails.serviceId,
                  )}
                  {renderTaskDetailsRow(
                    t('concerns.serviceName'),
                    concernDetails.taskDetails.serviceName,
                  )}
                </View>
                <View style={styles.taskDetailsRow}>
                  {renderTaskDetailsRow(
                    t('concerns.serviceDate'),
                    concernDetails.taskDetails.serviceDate,
                  )}
                  {renderTaskDetailsRow(
                    t('concerns.jobsite'),
                    concernDetails.taskDetails.jobsite,
                  )}
                </View>
                <View style={styles.taskDetailsRow}>
                  {renderTaskDetailsRow(
                    t('concerns.area'),
                    concernDetails.taskDetails.area,
                  )}
                  {renderTaskDetailsRow(
                    t('concerns.unit'),
                    concernDetails.taskDetails.unit,
                  )}
                </View>
              </View>
            </View>
          )}

          {/* Resolution Details Section (only for closed concerns) */}
          {concernDetails.resolution && (
            <View style={styles.sectionSpacing}>
              <View style={styles.resolutionHeader}>
                <Text style={styles.sectionTitle}>
                  {t('concerns.resolutionDetails')}
                </Text>
                <Text style={styles.resolvedDate}>
                  {t('concerns.resolvedOn')}:{' '}
                  {concernDetails.resolution.resolvedOn}
                </Text>
              </View>

              <Text style={styles.resolutionNote}>
                <Text style={styles.resolutionNoteLabel}>
                  {t('concerns.note')}
                  {'\n'}
                </Text>
                {concernDetails.resolution.note}
              </Text>

              <Text style={styles.sectionSubtitle}>
                {t('concerns.attachedImages')}
              </Text>
              {renderAttachedImages(
                concernDetails.resolution.attachedImages,
                true,
              )}
            </View>
          )}
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
    paddingBottom: Platform.OS === 'ios' ? 34 : theme.spacing.md,
  },
  mainCard: {
    backgroundColor: theme.colors.background.white,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadow.sm,
  },
  concernHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  concernTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
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
  raisedDate: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  sectionSpacing: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: theme.spacing.md,
  },
  sectionSubtitle: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.medium,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    lineHeight: 24,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  imageContainer: {
    width: (screenWidth - theme.spacing.md * 4 - theme.spacing.xs * 4) / 3,
    marginHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  attachedImage: {
    width: '100%',
    height: 80,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surface,
  },
  taskDetailsGrid: {
    gap: theme.spacing.md,
  },
  taskDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskDetailRow: {
    flex: 1,
  },
  taskDetailColumn: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  taskDetailLabel: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  taskDetailValue: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  resolutionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  resolvedDate: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  resolutionNote: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    lineHeight: 24,
    marginBottom: theme.spacing.sm,
  },
  resolutionNoteLabel: {
    fontFamily: theme.typography.fontFamily.medium,
  },
});

export default ConcernDetailsScreen;
