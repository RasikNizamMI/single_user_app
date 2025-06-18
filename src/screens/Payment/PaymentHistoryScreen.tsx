// screens/Payment/PaymentHistoryScreen.tsx
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

interface PaymentHistoryItem {
  id: string;
  service: string;
  amount: string;
  startDate: string;
  endDate: string;
  paymentDate: string;
  paymentMode: string;
  status: 'completed' | 'pending' | 'failed';
}

const PaymentHistoryScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  // Mock payment history data
  const paymentHistory: PaymentHistoryItem[] = [
    {
      id: '1',
      service: t('services.trashCollection'),
      amount: '50',
      startDate: 'Mar 12, 2023',
      endDate: 'Sep 15, 2024',
      paymentDate: 'Mar 12, 2023',
      paymentMode: 'Credit card',
      status: 'completed',
    },
    {
      id: '2',
      service: t('services.trashCollection'),
      amount: '50',
      startDate: 'Mar 12, 2023',
      endDate: 'Sep 15, 2024',
      paymentDate: 'Mar 12, 2023',
      paymentMode: 'Credit card',
      status: 'completed',
    },
    {
      id: '3',
      service: t('services.trashCollection'),
      amount: '50',
      startDate: 'Mar 12, 2023',
      endDate: 'Sep 15, 2024',
      paymentDate: 'Mar 12, 2023',
      paymentMode: 'Credit card',
      status: 'completed',
    },
    {
      id: '4',
      service: t('services.trashCollection'),
      amount: '50',
      startDate: 'Mar 12, 2023',
      endDate: 'Sep 15, 2024',
      paymentDate: 'Mar 12, 2023',
      paymentMode: 'Credit card',
      status: 'completed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'pending':
        return theme.colors.status.pending;
      case 'failed':
        return theme.colors.error;
      default:
        return theme.colors.text.secondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('services.status.completed');
      case 'pending':
        return t('services.status.pending');
      case 'failed':
        return 'Failed'; // Add this to translations if needed
      default:
        return status;
    }
  };

  const handlePaymentItemPress = (payment: PaymentHistoryItem) => {
    // Navigate to payment details or invoice
    console.log('Payment item pressed:', payment.id);
  };

  const renderPaymentItem = (payment: PaymentHistoryItem) => (
    <TouchableOpacity
      key={payment.id}
      style={styles.paymentItem}
      onPress={() => handlePaymentItemPress(payment)}>
      <View style={styles.paymentHeader}>
        <Text style={styles.serviceName}>{payment.service}</Text>
        <Text style={styles.amount}>${payment.amount}</Text>
      </View>

      <View style={styles.paymentDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>{t('payment.startEndDate')}</Text>
            <Text style={styles.detailValue}>
              {payment.startDate} - {payment.endDate}
            </Text>
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>{t('payment.date')}</Text>
            <Text style={styles.detailValue}>{payment.paymentDate}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>{t('payment.paymentMode')}</Text>
            <Text style={styles.detailValue}>{payment.paymentMode}</Text>
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>{t('payment.paymentStatus')}</Text>
            <Text
              style={[
                styles.statusText,
                {color: getStatusColor(payment.status)},
              ]}>
              {getStatusText(payment.status)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title={t('payment.paymentHistory')} showBackButton />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {paymentHistory.map(renderPaymentItem)}
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
  listContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  paymentItem: {
    backgroundColor: theme.colors.background.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.sm,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  serviceName: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    flex: 1,
  },
  amount: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
  },
  paymentDetails: {
    gap: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  detailValue: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
  },
  statusText: {
    ...theme.typography.body2,
    fontFamily: theme.typography.fontFamily.medium,
  },
});

export default PaymentHistoryScreen;
