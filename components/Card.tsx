import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  isDark?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children,
  variant = 'default',
  padding = 'md',
  isDark = false,
  className,
  ...props 
}) => {
  const getVariantStyles = () => {
    const baseColor = isDark ? 'bg-gray-800' : 'bg-white';
    
    switch (variant) {
      case 'default':
        return baseColor;
      case 'elevated':
        return `${baseColor} shadow-lg`;
      case 'outlined':
        return `${baseColor} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`;
      default:
        return baseColor;
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'p-3';
      case 'md':
        return 'p-4';
      case 'lg':
        return 'p-6';
      default:
        return 'p-4';
    }
  };

  const baseStyles = 'rounded-xl';
  const variantStyles = getVariantStyles();
  const paddingStyles = getPaddingStyles();

  return (
    <View 
      className={`${baseStyles} ${variantStyles} ${paddingStyles} ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
}; 