import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native/lib/typescript/src';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../types/navigation';
import AuthNavigator from '../../navigation/AuthNavigator';

type AuthNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

function RegisterScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const { t } = useTranslation();


  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  });

  // Validation state
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });

  // Handle form field changes
  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('firstNameRequired');
      isValid = false;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('lastNameRequired');
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = t('passwordTooShort');
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('confirmPasswordRequired');
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordsDontMatch');
      isValid = false;
    }

    // Terms validation
    if (!formData.acceptedTerms) {
      newErrors.terms = t('acceptTermsRequired');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle registration
  const handleRegister = () => {
    if (validateForm()) {
      // Simulate API call
      console.log('Registration data:', formData);

      // Show success message
      Alert.alert(
        t('registrationSuccess'),
        t('registrationSuccessMessage'),
        [
          {
            text: t('ok'),
            onPress: () => navigation.replace('Auth', { screen: 'Login' })
          }
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{t('createAccount')}</Text>

        {/* First Name */}
        <TextInput
          placeholder={t('firstName')}
          style={[styles.input, errors.firstName ? styles.inputError : null]}
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)} />
        {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

        {/* Last Name */}
        <TextInput
          placeholder={t('lastName')}
          style={[styles.input, errors.lastName ? styles.inputError : null]}
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)} />
        {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

        {/* Email */}
        <TextInput
          placeholder={t('email')}
          style={[styles.input, errors.email ? styles.inputError : null]}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none" />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        {/* Password */}
        <TextInput
          placeholder={t('password')}
          style={[styles.input, errors.password ? styles.inputError : null]}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        {/* Confirm Password */}
        <TextInput
          placeholder={t('confirmPassword')}
          style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          secureTextEntry />
        {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

        {/* Terms */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={[styles.checkbox, formData.acceptedTerms ? styles.checked : null]}
            onPress={() => handleChange('acceptedTerms', !formData.acceptedTerms)} />
          <Text style={styles.termsText}>{t('acceptTerms')}</Text>
        </View>
        {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>{t('register')}</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
        >
          <Text style={styles.footerText}>
            {t('alreadyHaveAccount')}{' '}
            <Text style={styles.loginText}>{t('login')}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2d8c4a',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#e74c3c',
    backgroundColor: '#fdecea',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 15,
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#2d8c4a',
    borderColor: '#2d8c4a',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  registerButton: {
    backgroundColor: '#2d8c4a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 25,
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  loginText: {
    color: '#2d8c4a',
    fontWeight: 'bold',
  },
});