// screens/Payment/SavedPaymentModesScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/domain/Header';
import theme from '../../constants/theme';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'paypal' | 'applepay';
  name: string;
  lastFour: string;
  category: 'cards' | 'other';
}

const SavedPaymentModesScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const creditCards: PaymentMethod[] = [
    {
      id: '1',
      type: 'visa',
      name: 'Visa',
      lastFour: '2545',
      category: 'cards',
    },
    {
      id: '2',
      type: 'mastercard',
      name: 'Mastercard',
      lastFour: '2545',
      category: 'cards',
    },
  ];

  const otherMethods: PaymentMethod[] = [
    {
      id: '3',
      type: 'paypal',
      name: 'Paypal',
      lastFour: '2545',
      category: 'other',
    },
    {
      id: '4',
      type: 'applepay',
      name: 'Apple pay',
      lastFour: '2545',
      category: 'other',
    },
  ];

  const handleEditPaymentMethod = (method: PaymentMethod) => {
    // Navigate to edit payment method screen
    console.log('Edit payment method:', method.id);
  };

  const handleAddNewCard = () => {
    // Navigate to add new card screen
    console.log('Add new card');
  };

  const handleAddNewID = () => {
    // Navigate to add new ID screen
    console.log('Add new ID');
  };

  const getPaymentIcon = (type: string) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      paypal: '💰',
      applepay: '📱',
    };
    return icons[type] || '💳';
  };

  const formatCardNumber = (lastFour: string) => {
    return `**** **** **** ${lastFour}`;
  };

  const renderPaymentMethod = (method: PaymentMethod) => (
    <View key={method.id} style={styles.paymentMethodItem}>
      <View style={styles.paymentMethodLeft}>
        <View style={styles.paymentIconContainer}>
          <Text style={styles.paymentIcon}>{getPaymentIcon(method.type)}</Text>
        </View>
        <View style={styles.paymentMethodInfo}>
          <Text style={styles.paymentMethodName}>{method.name}</Text>
          <Text style={styles.paymentMethodNumber}>
            {formatCardNumber(method.lastFour)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditPaymentMethod(method)}>
        <Text style={styles.editButtonText}>{t('common.edit')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddButton = (title: string, onPress: () => void) => (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <View style={styles.addIconContainer}>
        <Text style={styles.addIcon}>+</Text>
      </View>
      <Text style={styles.addButtonText}>{title}</Text>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title={t('payment.savedPaymentModes')} showBackButton />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Credit & Debit Cards Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('payment.creditCards')}</Text>

          {creditCards.map(renderPaymentMethod)}

          {renderAddButton(t('payment.addNewCard'), handleAddNewCard)}
        </View>

        {/* Other Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('payment.other')}</Text>

          {otherMethods.map(renderPaymentMethod)}

          {renderAddButton(t('payment.addNewId'), handleAddNewID)}
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
  sectionContainer: {
    backgroundColor: theme.colors.background.white,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadow.sm,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIconContainer: {
    width: 50,
    height: 35,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  paymentIcon: {
    fontSize: 20,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: theme.spacing.xs,
  },
  paymentMethodNumber: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  editButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  editButtonText: {
    ...theme.typography.body2,
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  addIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  addIcon: {
    fontSize: 20,
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  addButtonText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    flex: 1,
  },
  menuArrow: {
    ...theme.typography.h2,
    color: theme.colors.text.secondary,
    fontWeight: '300',
  },
});

export default SavedPaymentModesScreen;
