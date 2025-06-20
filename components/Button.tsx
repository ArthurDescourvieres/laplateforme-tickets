import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700';
      case 'secondary':
        return 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 active:bg-red-700';
      case 'success':
        return 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700';
      default:
        return 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2';
      case 'md':
        return 'px-4 py-3';
      case 'lg':
        return 'px-6 py-4';
      default:
        return 'px-4 py-3';
    }
  };

  const getTextSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const baseStyles = 'rounded-lg items-center justify-center';
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const widthStyles = fullWidth ? 'w-full' : '';
  const textSizeStyles = getTextSizeStyles();

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${className || ''}`}
      {...props}>
      <Text className={`font-semibold text-white ${textSizeStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};
