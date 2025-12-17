import { TextInputProps, TouchableOpacityProps } from 'react-native';

export interface CustomInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  isPassword?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  containerStyle?: object;
  inputStyle?: object;
  labelStyle?: object;
  errorStyle?: object;
}

export interface CustomButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  containerStyle?: object;
  textStyle?: object;
}

export interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  backgroundColor?: string;
  textColor?: string;
  style?: object;
}

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  backgroundColor?: string;
}

export interface LinkButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}