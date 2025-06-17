export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
  };
  
  export const validateLoginForm = (data: {
    email: string;
    password: string;
    acceptTerms: boolean;
  }): {
    email: string;
    password: string;
    terms: string;
  } => {
    const {email, password, acceptTerms} = data;
  
    const errors = {
      email: '',
      password: '',
      terms: '',
    };
  
    if (!email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    if (!password) {
      errors.password = 'Password is required';
    } else if (!isValidPassword(password)) {
      errors.password = 'Password must be at least 8 characters with 1 number';
    }
  
    if (!acceptTerms) {
      errors.terms = 'You must accept the terms and conditions';
    }
  
    return errors;
  };
  
  export const isFormValid = (errors: Record<string, string>): boolean => {
    return !Object.values(errors).some(error => error !== '');
  };