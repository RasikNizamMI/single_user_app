// screens/Auth/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Checkbox from '../../components/ui/Checkbox';
import Images from '../../constants/images';
import {useTranslation} from 'react-i18next';
import theme from '../../constants/theme';

interface LoginFormData {
  email: string;
  password: string;
  acceptTerms: boolean;
}

const LoginScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {login, loading} = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    acceptTerms: false,
  });

  const handleChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    // Simple validation
    if (!formData.email.trim()) {
      Alert.alert(t('common.error'), 'Please enter your email');
      return;
    }

    if (!formData.password.trim()) {
      Alert.alert(t('common.error'), 'Please enter your password');
      return;
    }

    if (!formData.acceptTerms) {
      Alert.alert(t('common.error'), 'Please accept the terms and conditions');
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (!result.success) {
        Alert.alert(t('common.error'), result.message);
      }
      // If successful, navigation will be handled by AuthContext/AppNavigator
    } catch (error) {
      Alert.alert(t('common.error'), 'Something went wrong. Please try again.');
    }
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword' as never);
  };

  const isLoginDisabled = !formData.email.trim() || !formData.password.trim() || loading;

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
            label={t('login.emailLabel')}
            placeholder={t('login.emailPlaceholder')}
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            editable={!loading}
          />

          <Input
            label={t('login.passwordLabel')}
            placeholder={t('login.passwordPlaceholder')}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={styles.forgotPasswordBtn}
            onPress={navigateToForgotPassword}
            disabled={loading}>
            <Text style={styles.forgotPasswordText}>
              {t('login.forgotPassword')}
            </Text>
          </TouchableOpacity>

          <Checkbox
            checked={formData.acceptTerms}
            onToggle={() => handleChange('acceptTerms', !formData.acceptTerms)}
            labelComponent={<TermsLabel />}
            style={styles.checkboxContainer}
            disabled={loading}
          />

          <Button
            title={loading ? t('common.loading') : t('login.loginButton')}
            onPress={handleLogin}
            disabled={isLoginDisabled}
            variant={formData.acceptTerms ? 'primary' : 'secondary'}
            style={styles.loginButton}
            loading={loading}
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
  formContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: 40,
  },
  formTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  forgotPasswordBtn: {
    alignSelf: 'flex-end',
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  forgotPasswordText: {
    ...theme.typography.body2,
    color: theme.colors.primary,
  },
  checkboxContainer: {
    marginBottom: theme.spacing.lg,
  },
  termsText: {
    ...theme.typography.body2,
    color: theme.colors.disabled,
    flex: 1,
  },
  termsLink: {
    ...theme.typography.body2,
    color: theme.colors.primary,
  },
  loginButton: {
    marginTop: theme.spacing.sm,
  },
});

export default LoginScreen;