export default {
     register: {
      title: 'Create Account',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      button: 'Sign Up',
      loginPrompt: 'Already have an account? Login',
      agreeToTerms: 'I agree to the',
      termsLink: 'Terms and Conditions',
    },
    errors: {
      required: '{{field}} is required',
      invalidEmail: 'Invalid email address',
      passwordMatch: 'Passwords must match',
      minLength: 'Must be at least {{min}} characters',
      termsRequired: 'You must accept the terms and conditions'
    },
  
  login: {
    title: 'Login',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    forgotPassword: 'Forgot password?',
    termsCheckbox: 'I accept the',
    termsAndCondition: 'Terms & Conditions',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    loginButton: 'Login',
  },
  forgotPassword: {
    title: 'Forgot Password',
    description: 'Enter your email address to receive a password reset link',
    emailPlaceholder: 'Email Address',
    sendButton: 'Send Reset Link',
    successTitle: 'Email Sent',
    successMessage:
      'Please check your email for instructions to reset your password',
    okButton: 'OK',
  },
  dashboard: {
    todayTasks: "Today's Task Overview",
    siteEvaluations: 'Site Evaluation',
    concerns: 'Concern',
    clockOutRequests: 'Clock-Out Requests',
  },
  siteEvaluation: {
    title: 'Site Evaluation',
    detailTitle: 'Site Evaluation Details',
    addTitle: 'Add New Site Evaluation',
  },
  navigation: {
    home: 'Home',
    services: 'Services',
    chat: 'Chat',
    more: 'More',
  },
  common: {
    cancel: 'Cancel',
    add: 'Add',
    ok: 'OK',
  },
};