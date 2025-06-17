// screens/Payment/PaymentScreen.tsx
import React, {useState} from 'react';
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
import Icons from '../../constants/icons';

interface PaymentData {
  amount: string;
  service: string;
  dueDate: string;
}

const PaymentScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [currentPaymentIndex, setCurrentPaymentIndex] = useState(0);

  // Mock payment data - replace with actual data
  const paymentData: PaymentData = {
    amount: '40.59',
    service: 'Dog Walking',
    dueDate: 'Dec 31, 2024',
  };

  const handlePayNow = () => {
    navigation.navigate('ChoosePaymentMethod', {
      paymentData,
    });
  };

  const handlePaymentHistory = () => {
    navigation.navigate('PaymentHistory');
  };

  const handleSavedPaymentModes = () => {
    navigation.navigate('SavedPaymentModes');
  };

  const handleSchedulePayment = () => {
    // Navigate to schedule payment screen
    console.log('Navigate to schedule payment');
  };

  const rightIcons = [
    {
      iconName: 'headphones' as keyof typeof Icons,
      onPress: () => console.log('Support pressed'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title="Payment" showBackButton rightIcons={rightIcons} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Payment Card */}
        <View style={styles.paymentCard}>
          <Text style={styles.amountLabel}>Amount Due</Text>
          <Text style={styles.amount}>${paymentData.amount}</Text>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>{paymentData.service}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Due date</Text>
              <Text style={styles.detailValue}>{paymentData.dueDate}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>

          {/* Pagination dots */}
          <View style={styles.paginationContainer}>
            {[0, 1, 2, 3, 4].map(index => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor:
                      index === currentPaymentIndex
                        ? theme.colors.primary
                        : theme.colors.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handlePaymentHistory}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🕒</Text>
            </View>
            <Text style={styles.menuText}>Payment History</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleSavedPaymentModes}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>💳</Text>
            </View>
            <Text style={styles.menuText}>Saved Payment Modes</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleSchedulePayment}>
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>📅</Text>
            </View>
            <Text style={styles.menuText}>Schedule Payment</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
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
  paymentCard: {
    backgroundColor: theme.colors.background.white,
    margin: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadow.sm,
    alignItems: 'center',
  },
  amountLabel: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  amount: {
    ...theme.typography.h1,
    fontSize: 32,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  detailValue: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  payButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl * 2,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    width: '100%',
  },
  payButtonText: {
    ...theme.typography.body1,
    color: theme.colors.text.inverse,
    fontFamily: theme.typography.fontFamily.medium,
    textAlign: 'center',
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
    marginHorizontal: theme.spacing.xs,
  },
  menuContainer: {
    backgroundColor: theme.colors.background.white,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadow.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuText: {
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

export default PaymentScreen;
