// screens/Payment/PaymentInvoiceScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useRoute, useNavigation} from '@react-navigation/native';
import Header from '../../components/domain/Header';
import theme from '../../constants/theme';
// Import for PDF generation (install: npm install react-native-html-to-pdf)
// import RNHTMLtoPDF from 'react-native-html-to-pdf';

interface RouteParams {
  paymentData: {
    amount: string;
    service: string;
    dueDate: string;
  };
  selectedMethod?: {
    id: string;
    type: string;
    label: string;
    lastFour: string;
  };
}

const PaymentInvoiceScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const {paymentData, selectedMethod} = route.params as RouteParams;

  const invoiceData = {
    invoiceNumber: '#00000',
    invoiceId: '#INV0001',
    date: new Date().toLocaleDateString(),
    dueDate: '12/12/12',
    companyName: '<Company Name>',
    companyAddress: '<123 Street Address, City, Zip/Post>',
    companyWebsite: '<Website, Email Address>',
    companyPhone: '<Phone Number>',
    billTo: {
      name: '<Contact Name>',
      company: '<Client Company Name>',
      address: '<Address>',
      phone: '<Phone, Email>',
    },
    projectDetails: {
      name: '<Project Name>',
      description: '<Project Description>',
    },
    items: [
      // Mock invoice items - replace with actual data
      {description: '', hours: '', rate: '', total: '0.00'},
      {description: '', hours: '', rate: '', total: '0.00'},
      {description: '', hours: '', rate: '', total: '0.00'},
      {description: '', hours: '', rate: '', total: '0.00'},
      {description: '', hours: '', rate: '', total: '0.00'},
      {description: '', hours: '', rate: '', total: '0.00'},
      {description: '', hours: '', rate: '', total: '0.00'},
      {description: '', hours: '', rate: '', total: '0.00'},
      {description: '', hours: '', rate: '', total: '0.00'},
    ],
    balanceDue: paymentData.amount,
  };

  const handleDownloadPDF = async () => {
    try {
      // Implementation for PDF generation
      // You would need to install react-native-html-to-pdf or similar library
      Alert.alert(
        'PDF Download',
        'PDF generation feature would be implemented here',
      );

      // Example implementation:
      // const options = {
      //   html: generateInvoiceHTML(),
      //   fileName: `invoice_${invoiceData.invoiceNumber}`,
      //   directory: 'Documents',
      // };
      // const pdf = await RNHTMLtoPDF.convert(options);
      // console.log('PDF created at:', pdf.filePath);
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert(t('common.error'), 'Failed to generate PDF');
    }
  };

  const generateInvoiceHTML = () => {
    // Generate HTML template for PDF
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .header { text-align: center; margin-bottom: 20px; }
            .invoice-details { margin: 20px 0; }
            .table { width: 100%; border-collapse: collapse; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${t('payment.paymentSuccessful')}</h1>
            <p>${t('payment.invoice')} ${invoiceData.invoiceNumber}</p>
          </div>
          <!-- Add more invoice content here -->
        </body>
      </html>
    `;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={theme.colors.background.white}
      />

      <Header title={t('payment.paymentInvoice')} showBackButton />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <Text style={styles.successTitle}>
            {t('payment.paymentSuccessful')}
          </Text>
          <Text style={styles.invoiceNumber}>
            {t('payment.invoice')} {invoiceData.invoiceNumber}
          </Text>
        </View>

        {/* Invoice */}
        <View style={styles.invoiceContainer}>
          <View style={styles.invoiceHeader}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{invoiceData.companyName}</Text>
              <Text style={styles.companyDetails}>
                {invoiceData.companyAddress}
              </Text>
              <Text style={styles.companyDetails}>
                {invoiceData.companyWebsite}
              </Text>
              <Text style={styles.companyDetails}>
                {invoiceData.companyPhone}
              </Text>
            </View>
            <View style={styles.invoiceTitle}>
              <Text style={styles.invoiceTitleText}>
                {t('payment.invoice').toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Invoice Details */}
          <View style={styles.invoiceDetails}>
            <View style={styles.billToSection}>
              <Text style={styles.sectionTitle}>BILL TO</Text>
              <Text style={styles.billToText}>{invoiceData.billTo.name}</Text>
              <Text style={styles.billToText}>
                {invoiceData.billTo.company}
              </Text>
              <Text style={styles.billToText}>
                {invoiceData.billTo.address}
              </Text>
              <Text style={styles.billToText}>{invoiceData.billTo.phone}</Text>
            </View>

            <View style={styles.projectSection}>
              <Text style={styles.sectionTitle}>PROJECT DETAILS</Text>
              <Text style={styles.projectText}>
                {invoiceData.projectDetails.name}
              </Text>
              <Text style={styles.projectText}>
                {invoiceData.projectDetails.description}
              </Text>
            </View>

            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceInfoText}>
                Invoice No: {invoiceData.invoiceId}
              </Text>
              <Text style={styles.invoiceInfoText}>
                Invoice Date: {invoiceData.date}
              </Text>
              <Text style={styles.invoiceInfoText}>
                Due Date: {invoiceData.dueDate}
              </Text>
            </View>
          </View>

          {/* Invoice Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, {flex: 2}]}>
                DESCRIPTION
              </Text>
              <Text style={[styles.tableHeaderText, {flex: 1}]}>HOURS</Text>
              <Text style={[styles.tableHeaderText, {flex: 1}]}>RATE</Text>
              <Text style={[styles.tableHeaderText, {flex: 1}]}>TOTAL</Text>
            </View>

            {invoiceData.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, {flex: 2}]}>
                  {item.description}
                </Text>
                <Text style={[styles.tableCell, {flex: 1}]}>{item.hours}</Text>
                <Text style={[styles.tableCell, {flex: 1}]}>{item.rate}</Text>
                <Text style={[styles.tableCell, {flex: 1}]}>{item.total}</Text>
              </View>
            ))}
          </View>

          {/* Thank you message */}
          <Text style={styles.thankYou}>Thank you for your business!</Text>

          {/* Balance Due */}
          <View style={styles.balanceDueContainer}>
            <Text style={styles.balanceDueLabel}>Balance Due $</Text>
            <View style={styles.balanceDueLine} />
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsTitle}>Terms & Instructions</Text>
            <Text style={styles.termsText}>
              &lt;Add payment instructions here, e.g. bank, paypal, ...&gt;
            </Text>
            <Text style={styles.termsText}>
              &lt;Add terms here, e.g. warranty, returns policy, ...&gt;
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Download Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownloadPDF}>
          <Text style={styles.downloadButtonText}>
            {t('payment.downloadAsPdf')}
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
  successHeader: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  successTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  invoiceNumber: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  invoiceContainer: {
    backgroundColor: theme.colors.background.white,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadow.sm,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  companyDetails: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  invoiceTitle: {
    alignItems: 'flex-end',
  },
  invoiceTitleText: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  billToSection: {
    flex: 1,
  },
  projectSection: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  invoiceInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  sectionTitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.xs,
  },
  billToText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  projectText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  invoiceInfoText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tableHeaderText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  tableCell: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  thankYou: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  balanceDueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  balanceDueLabel: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
    marginRight: theme.spacing.sm,
  },
  balanceDueLine: {
    height: 1,
    backgroundColor: theme.colors.border,
    width: 80,
  },
  termsContainer: {
    marginTop: theme.spacing.lg,
  },
  termsTitle: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.xs,
  },
  termsText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  bottomContainer: {
    backgroundColor: theme.colors.background.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : theme.spacing.md,
  },
  downloadButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  downloadButtonText: {
    ...theme.typography.body1,
    color: theme.colors.text.inverse,
    fontFamily: theme.typography.fontFamily.medium,
    textAlign: 'center',
  },
});

export default PaymentInvoiceScreen;
