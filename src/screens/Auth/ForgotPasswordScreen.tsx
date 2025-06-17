import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Images from '../../constants/images';
import CustomModal from '../../components/ui/Modal';
import {typography} from '../../constants/typography';
import theme from '../../constants/theme';

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSend = async () => {
    if (!validateEmail()) return;

    setLoading(true);

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Top SafeArea - Blue */}
      <SafeAreaView style={styles.topSafeArea} />

      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.description}>
          Please provide your registered email address to receive your login
          credentials.
        </Text>

        <View style={styles.inputWrapper}>
          <Input
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            error={error || undefined}
            keyboardType="email-address"
            autoCapitalize="none"
            label={'Email Address'}
          />
        </View>

        <Button
          title="Send"
          onPress={handleSend}
          loading={loading}
          disabled={!email}
          style={styles.sendButton}
        />
      </View>

      <CustomModal
        visible={showSuccessModal}
        title="Email Sent!"
        message="Your Login Credentials has been sent to your registered e-mail Address"
        icon={Images.success}
        primaryButtonText="OK"
        onPrimaryButtonPress={handleCloseModal}
      />

      {/* Bottom SafeArea - White */}
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
  tagline: {
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
  },
  title: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: 12,
    color: theme.colors.text.primary,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: 24,
    lineHeight: 24,
  },
  inputWrapper: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: '#717C7E',
    marginBottom: 8,
    marginLeft: 4,
  },
  sendButton: {
    marginTop: 10,
    height: 48,
  },
});

export default ForgotPasswordScreen;