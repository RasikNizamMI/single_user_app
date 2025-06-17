export default {
  
    register: {
      title: 'Crear Cuenta',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'correo',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      button: 'Registrarse',
      loginPrompt: '¿Ya tienes cuenta? Inicia sesión',
      agreeToTerms: 'Acepto los',
      termsLink: 'Términos y Condiciones'
    },
    errors: {
      required: '{{field}} es obligatorio',
      invalidEmail: 'Correo inválido',
      passwordMatch: 'Las contraseñas deben coincidir',
      minLength: 'Mínimo {{min}} caracteres',
      termsRequired: 'Debes aceptar los términos y condiciones'
    },
 
  login: {
    title: 'Iniciar Sesión',
    emailPlaceholder: 'ID de Correo',
    passwordPlaceholder: 'Contraseña',
    forgotPassword: '¿Olvidó su contraseña?',
    termsCheckbox: 'Acepto',
    termsAndCondition: 'Términos y Condiciones',
    and: 'y',
    privacyPolicy: 'Política de Privacidad',
    loginButton: 'Iniciar Sesión',
  },
  forgotPassword: {
    title: 'Olvidé mi Contraseña',
    description:
      'Ingrese su dirección de correo para recibir un enlace de restablecimiento',
    emailPlaceholder: 'Dirección de Correo',
    sendButton: 'Enviar Enlace',
    successTitle: '¡Correo Enviado!',
    successMessage: 'Revise su correo para instrucciones de restablecimiento',
    okButton: 'OK',
  },
  dashboard: {
    todayTasks: 'Resumen de Tareas de Hoy',
    siteEvaluations: 'Evaluaciones',
    concerns: 'Preocupaciones',
    clockOutRequests: 'Solicitudes de Salida',
  },
  siteEvaluation: {
    title: 'Evaluación del Sitio',
    detailTitle: 'Detalles de Evaluación',
    addTitle: 'Agregar Nueva Evaluación',
  },
  common: {
    cancel: 'Cancelar',
    add: 'Agregar',
    ok: 'Aceptar',
  },
};
