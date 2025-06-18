// screens/Observations/SiteEvaluationDetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useRoute, useNavigation} from '@react-navigation/native';
import Header from '../../components/domain/Header';
import theme from '../../constants/theme';
import Icons from '../../constants/icons';

const {width: screenWidth} = Dimensions.get('window');

interface RouteParams {
  observationId: string;
  observation: {
    id: string;
    title: string;
    reporter: {
      id: string;
      name: string;
      role: string;
      avatar: any;
    };
    reportedDate: string;
    status: string;
    service: string;
    description?: string;
  };
}

const SiteEvaluationDetailsScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const {observation} = route.params as RouteParams;

  // Mock detailed data
  const evaluationDetails = {
    ...observation,
    fullTitle: `${observation.title} | ${observation.service}`,
    description:
      'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
    category: 'Walkthrough',
    attachedImages: [
      require('../../assets/images/user.png'),
      require('../../assets/images/user.png'),
      require('../../assets/images/user.png'),
      require('../../assets/images/user.png'),
    ],
  };

  const handleCallReporter = () => {
    console.log('Call reporter:', observation.reporter.name);
  };

  const handleChatReporter = () => {
    console.log('Chat with reporter:', observation.reporter.name);
    navigation.navigate('ChatDetail', {chatId: observation.reporter.id});
  };

  const handleImagePress = (imageIndex: number) => {
    console.log('View image at index:', imageIndex);
    // Navigate to image viewer or open full screen
  };

  const renderAttachedImage = (image: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.imageContainer}
      onPress={() => handleImagePress(index)}
      activeOpacity={0.8}>
      <Image source={image} style={styles.attachedImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title={t('siteEvaluation.detailTitle')} showBackButton />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {/* Reporter Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('siteEvaluation.reporterDetails')}
          </Text>

          <View style={styles.reporterCard}>
            <View style={styles.reporterInfo}>
              <Image
                source={observation.reporter.avatar}
                style={styles.reporterAvatar}
              />
              <Text style={styles.reporterName}>
                {observation.reporter.name} ({observation.reporter.role})
              </Text>
            </View>

            <View style={styles.reporterActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleCallReporter}>
                <Image source={Icons.phone} style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleChatReporter}>
                <Image source={Icons.chat} style={styles.actionIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Observation Details Section */}
        <View style={styles.section}>
          <View style={styles.observationHeader}>
            <View style={styles.observationTitleContainer}>
              <Text style={styles.observationTitle}>
                {evaluationDetails.fullTitle}
              </Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {evaluationDetails.category}
                </Text>
              </View>
            </View>
            <Text style={styles.reportedDate}>
              {t('siteEvaluation.reportedOn')}: {observation.reportedDate}
            </Text>
          </View>

          <Text style={styles.description}>
            {evaluationDetails.description}
          </Text>
        </View>

        {/* Attached Images Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('siteEvaluation.attachedImages')}
          </Text>

          <View style={styles.imagesGrid}>
            {evaluationDetails.attachedImages.map(renderAttachedImage)}
          </View>
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
  section: {
    backgroundColor: theme.colors.background.white,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadow.sm,
  },
  sectionTitle: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: theme.spacing.md,
  },
  reporterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reporterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reporterAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.md,
  },
  reporterName: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    flex: 1,
  },
  reporterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: theme.colors.text.primary,
  },
  observationHeader: {
    marginBottom: theme.spacing.md,
  },
  observationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  observationTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  categoryBadge: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  reportedDate: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
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
    width:
      (screenWidth -
        theme.spacing.md * 2 -
        theme.spacing.md * 2 -
        theme.spacing.xs * 6) /
      4,
    marginHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  attachedImage: {
    width: '100%',
    height: 80,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surface,
  },
});

export default SiteEvaluationDetailsScreen;
