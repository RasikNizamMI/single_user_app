const theme = {
    colors: {
      primary: '#086CEE',
      primaryDark: '#0756BD',
      secondary: '#CDD7DA',
      error: '#FF5252',
      warning: '#B1000F',
      success: '#049B22',
      surface: '#F5F5F5',
      disabled: '#717C7E',
      text: {
        primary: '#212D30',
        secondary: '#717C7E',
        subTitle: '#515C5F',
        disabled: '#CDD7DA',
        inverse: '#FFFFFF',
        placeholder: '#364144',
      },
      border: '#9AA5A8',
      status: {
        inprogress: '#086CEE',
        upcomming: '#793EF0',
        rejected: '#B1000F',
        delayed: '#BA5900',
        abandoned: '#006D8F',
        incomplete: '#F2930D',
        completed: '#049B22',
        ongoing: '#4ECDC4',
        pending: '#FFC75F',
  
      },
      statusBackground: {
        inprogress: '#D7F0FF',
        upcomming: '#F0E9FF',
        rejected: '#FFF2F3',
        delayed: '#FFE6CF',
        abandoned: '#E8EBEC',
        incomplete: '#FFFFD8',
        completed: '#E1FCDE',
      },
      background: {
        white: '#FFFFFF',
        black: '#000000',
      },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    typography: {
      h1: {
        fontSize: 24,
        lineHeight: 32,
        fontFamily: 'Roboto-Bold',
      },
      h2: {
        fontSize: 20,
        lineHeight: 28,
        fontFamily: 'Roboto-Bold',
      },
      h3: {
        fontSize: 18,
        lineHeight: 26,
        fontFamily: 'Roboto-Medium',
      },
      body1: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Roboto-Regular',
      },
      body2: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: 'Roboto-Regular',
      },
      caption: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'Roboto-Regular',
      },
      overline: {
        fontSize: 10,
        lineHeight: 14,
        letterSpacing: 1.5,
        fontFamily: 'Roboto-Regular',
      },
  
      // Font Family Mapping for global reuse
      fontFamily: {
        thin: 'Roboto-Thin',
        light: 'Roboto-Light',
        regular: 'Roboto-Regular',
        medium: 'Roboto-Medium',
        bold: 'Roboto-Bold',
        black: 'Roboto-Black',
  
        italic: 'Roboto-Italic',
        thinItalic: 'Roboto-ThinItalic',
        lightItalic: 'Roboto-LightItalic',
        mediumItalic: 'Roboto-MediumItalic',
        boldItalic: 'Roboto-BoldItalic',
        blackItalic: 'Roboto-BlackItalic',
  
        condensed: 'Roboto-Condensed',
        condensedItalic: 'Roboto-CondensedItalic',
        boldCondensed: 'Roboto-BoldCondensed',
        boldCondensedItalic: 'Roboto-BoldCondensedItalic',
      },
  
      // Optional font size mapping
      fontSize: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
        xxl: 20,
        xxxl: 24,
      },
    },
  
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
    },
    shadow: {
      sm: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
    },
    // For backward compatibility
    elevation: {
      xs: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
      },
      sm: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
    },
    // Additional palette colors for specific UI elements
    palette: {
      gray100: '#F5F7FA',
      gray200: '#E5E7EB',
      gray300: '#D1D5DB',
      gray400: '#9CA3AF',
      gray500: '#6B7280',
      gray600: '#4B5563',
      gray700: '#374151',
      gray800: '#1F2937',
      incomplete: '#9C27B0', // Purple
      lateComplete: '#FF80AB', // Pink
      abandoned: '#673AB7', // Deep Purple
      rejected: '#F44336', // Red
    },
  };
  
  export default theme;