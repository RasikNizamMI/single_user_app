// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import theme from '../../constants/theme';
// import Icons from '../../constants/icons';

// interface InputProps {
//   label?: string;
//   placeholder: string;
//   value: string;
//   onChangeText: (text: string) => void;
//   secureTextEntry?: boolean;
//   error?: string;
//   autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
//   keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
//   autoCorrect?: boolean;
//   style?: object;
//   multiline?: boolean;
//   numberOfLines?: number;
// }

// const Input: React.FC<InputProps> = ({
//   label,
//   placeholder,
//   value,
//   onChangeText,
//   secureTextEntry = false,
//   error,
//   autoCapitalize = 'none',
//   keyboardType = 'default',
//   autoCorrect = false,
//   style = {},
//   multiline = false,
//   numberOfLines = 1,
// }) => {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   return (
//     <View style={[styles.container, style]}>
//       {label && <Text style={styles.label}>{label}</Text>}
//       <View style={[styles.inputContainer, error ? styles.inputError : {}]}>
//         <TextInput
//           style={styles.input}
//           placeholder={placeholder}
//           placeholderTextColor="#717C7E"
//           value={value}
//           onChangeText={onChangeText}
//           secureTextEntry={secureTextEntry && !isPasswordVisible}
//           autoCapitalize={autoCapitalize}
//           keyboardType={keyboardType}
//           autoCorrect={autoCorrect}
//           multiline={multiline}
//           numberOfLines={numberOfLines}
//         />
//         {secureTextEntry && (
//           <TouchableOpacity
//             style={styles.iconContainer}
//             onPress={togglePasswordVisibility}
//             activeOpacity={0.7}>
//             <Image
//               source={isPasswordVisible ? Icons.eyeOff : Icons.eye}
//               style={styles.icon}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//       {error && <Text style={styles.errorText}>{error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//     width: '100%',
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '400',
//     lineHeight: 22,
//     fontFamily: 'Roboto',
//     color: '#717C7E',
//     marginBottom: 8,
//     marginLeft: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     height: 48,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: '400',
//     color: '#364144',
//     fontFamily: 'Roboto',
//     paddingVertical: 12,
//     height: '100%',
//   },
//   inputError: {
//     borderColor: theme.colors.error,
//   },
//   iconContainer: {
//     padding: 8,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     tintColor: '#717C7E',
//   },
//   errorText: {
//     fontSize: 12,
//     fontWeight: '400',
//     color: theme.colors.error,
//     marginTop: 4,
//     marginLeft: 4,
//     fontFamily: 'Roboto',
//   },
// });

// export default Input;

// components/ui/OutlinedInput.tsx
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import theme from '../../constants/theme';

interface OutlinedInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCorrect?: boolean;
  style?: object;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
}

const OutlinedInput: React.FC<OutlinedInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  autoCapitalize = 'none',
  keyboardType = 'default',
  autoCorrect = false,
  style = {},
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  right,
  left,
}) => {
  const [isFocused, setIsFocused] = useState(false);


  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        multiline={multiline}
        numberOfLines={numberOfLines}
        disabled={disabled}
        mode="outlined"
        onFocus={handleFocus}
        onBlur={handleBlur}
        right={right}
        left={left}
        error={!!error}
        style={styles.input}
        outlineColor={isFocused ? theme.colors.primary : theme.colors.border}
        activeOutlineColor={error ? theme.colors.error : theme.colors.primary}
        selectionColor={theme.colors.primary}
        placeholderTextColor={theme.colors.text.placeholder}
        theme={{
          ...theme,
          colors: {
            ...theme.colors,
            primary: theme.colors.primary,
            error: theme.colors.error,
            placeholder: theme.colors.text.placeholder,
            text: theme.colors.text,
            background: theme.colors.background.white,
          },
          roundness: 8,
        }}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    height: 50,
    fontFamily: theme.typography.fontFamily.regular,
  },
  errorText: {
    color: '#EB5757',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: theme.typography.fontFamily.regular,
  },
});

export default OutlinedInput;