import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  AuthNavigationProp,
  LoginFormData,
  LoginFormErrors,
} from '../../types/auth';
import {useAuth} from '../../context/AuthContext'; // Import useAuth hook

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import Images from '../../constants/images';
import {typography} from '../../constants/typography';
import {useTranslation} from 'react-i18next';
import {validateLoginForm, isFormValid} from '../../utils/validation';
import theme from '../../constants/theme';

const LoginScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<AuthNavigationProp>();
  const {login} = useAuth(); // Use the auth context

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({
    email: '',
    password: '',
    terms: '',
  });

  const handleChange = (
    field: keyof LoginFormData,
    value: string | boolean,
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = validateLoginForm(formData);
    setErrors(newErrors);
    return isFormValid(newErrors);
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const result = await login(formData);

        // Check if login was successful
        if (result?.success) {
          // Navigation will be handled automatically by AppNavigator based on auth state
          console.log('Login successful:', result.message);
        } else {
          // Error is already handled by AuthContext with modal
          console.log('Login failed:', result?.message);

          // Optionally, you can add additional UI feedback here
          // For example, shake animation, focus on email field, etc.
        }
      } catch (error) {
        // This shouldn't happen now since AuthContext handles errors gracefully
        console.error('Unexpected login error:', error);
      }
    }
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const TermsLabel = () => (
    <Text style={styles.termsText}>
      {t('login.termsCheckbox')}{' '}
      <Text style={styles.termsLink}>{t('login.termsAndCondition')}</Text>{' '}
      {t('login.and')}{' '}
      <Text style={styles.termsLink}>{t('login.privacyPolicy')}</Text>
    </Text>
  );

  return (
    <View style={styles.container}>
      {/* Top SafeArea - Blue */}
      <SafeAreaView style={styles.topSafeArea} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{t('login.title')}</Text>

          <Input
            label="Mail ID"
            placeholder={t('login.emailPlaceholder')}
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            error={errors.email}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />

          <Input
            label="Password"
            placeholder={t('login.passwordPlaceholder')}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
            error={errors.password}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.forgotPasswordBtn}
            onPress={navigateToForgotPassword}>
            <Text style={styles.forgotPasswordText}>
              {t('login.forgotPassword')}
            </Text>
          </TouchableOpacity>

          <Checkbox
            checked={formData.acceptTerms}
            onToggle={() => handleChange('acceptTerms', !formData.acceptTerms)}
            labelComponent={<TermsLabel />}
            error={errors.terms}
            style={styles.checkboxContainer}
          />

          <Button
            title={t('login.loginButton')}
            onPress={handleLogin}
            disabled={!formData.email || !formData.password}
            variant={formData.acceptTerms ? 'primary' : 'secondary'}
            style={styles.loginButton}
          />
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomSafeArea} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: theme.colors.primary,
  },
  bottomSafeArea: {
    flex: 0,
    backgroundColor: theme.colors.background.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 40,
  },
  logo: {
    width: 235,
    height: 110,
    marginBottom: 10,
  },
  logoText: {
    ...typography.h1,
    color: theme.colors.background.white,
    letterSpacing: 1,
    marginBottom: 2,
  },
  subLogoText: {
    ...typography.h3,
    color: theme.colors.background.white,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  formContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  formTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 20,
    color: theme.colors.text.primary,
    marginBottom: 24,
  },
  forgotPasswordBtn: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 14,
  },
  checkboxContainer: {
    marginBottom: 24,
  },
  termsText: {
    color: theme.colors.disabled,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 14,
    flex: 1,
  },
  termsLink: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 14,
  },
  loginButton: {
    marginTop: 8,
  },
});

export default LoginScreen;