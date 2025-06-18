// screens/Payment/ChoosePaymentMethodScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/domain/Header';
import theme from '../../constants/theme';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'paypal' | 'applepay';
  label: string;
  lastFour: string;
  icon: string;
}

interface RouteParams {
  paymentData: {
    amount: string;
    service: string;
    dueDate: string;
  };
}

const ChoosePaymentMethodScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const {paymentData} = route.params as RouteParams;

  const [selectedMethod, setSelectedMethod] = useState<string>('mastercard');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'visa',
      type: 'visa',
      label: 'Visa',
      lastFour: '2545',
      icon: '💳',
    },
    {
      id: 'mastercard',
      type: 'mastercard',
      label: 'Mastercard',
      lastFour: '2545',
      icon: '💳',
    },
    {
      id: 'paypal',
      type: 'paypal',
      label: 'Paypal',
      lastFour: '2545',
      icon: '💰',
    },
    {
      id: 'applepay',
      type: 'applepay',
      label: 'Apple Pay',
      lastFour: '2545',
      icon: '📱',
    },
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleAddNewCard = () => {
    // Navigate to add new card screen
    console.log('Add new card');
  };

  const handlePay = () => {
    navigation.navigate('PaymentInvoice', {
      paymentData,
      selectedMethod: paymentMethods.find(m => m.id === selectedMethod),
    });
  };

  const formatCardNumber = (lastFour: string) => {
    return `**** **** **** ${lastFour}`;
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title={t('payment.choosePaymentMethod')} showBackButton />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Payment Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>{t('payment.payableAmount')}</Text>
          <Text style={styles.summaryAmount}>${paymentData.amount}</Text>
          <Text style={styles.summaryService}>{t('payment.service')}</Text>
          <Text style={styles.summaryServiceValue}>{paymentData.service}</Text>
        </View>

        {/* Payment Methods Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {t('payment.choosePaymentMethod')}
          </Text>

          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={styles.paymentMethodItem}
              onPress={() => handlePaymentMethodSelect(method.id)}>
              <View style={styles.paymentMethodLeft}>
                <View style={styles.paymentIconContainer}>
                  <Text style={styles.paymentIcon}>
                    {getPaymentIcon(method.type)}
                  </Text>
                </View>
                <Text style={styles.paymentMethodText}>
                  {formatCardNumber(method.lastFour)}
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedMethod === method.id && styles.radioButtonSelected,
                ]}>
                {selectedMethod === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Add New Card */}
          <TouchableOpacity
            style={styles.addNewCard}
            onPress={handleAddNewCard}>
            <View style={styles.addIconContainer}>
              <Text style={styles.addIcon}>+</Text>
            </View>
            <Text style={styles.addNewCardText}>{t('payment.addNewCard')}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.payButtonText}>
            {t('payment.payNow')} ${paymentData.amount}
          </Text>
        </TouchableOpacity>
      </View>
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
  summaryCard: {
    backgroundColor: theme.colors.background.white,
    margin: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadow.sm,
    alignItems: 'center',
  },
  summaryLabel: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  summaryAmount: {
    ...theme.typography.h1,
    fontSize: 32,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  summaryService: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  summaryServiceValue: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
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
    width: 40,
    height: 30,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  paymentIcon: {
    fontSize: 18,
  },
  paymentMethodText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  addNewCard: {
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
  addNewCardText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    flex: 1,
  },
  menuArrow: {
    ...theme.typography.h2,
    color: theme.colors.text.secondary,
    fontWeight: '300',
  },
  bottomContainer: {
    backgroundColor: theme.colors.background.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : theme.spacing.md,
  },
  payButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  payButtonText: {
    ...theme.typography.body1,
    color: theme.colors.text.inverse,
    fontFamily: theme.typography.fontFamily.medium,
    textAlign: 'center',
  },
});

export default ChoosePaymentMethodScreen;
