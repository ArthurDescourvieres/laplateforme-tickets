import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { AnimatedCube } from './AnimatedCube';

interface IntroScreenProps {
  onFinish: () => void;
  duration?: number; // durée en millisecondes
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ 
  onFinish, 
  duration = 3000 // 3 secondes par défaut
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Configuration des 8 cubes selon tes spécifications
  const cubes = [
    { size: 12, opacity: 0.1, positionX: 20, positionY: 15, movementType: 'vertical' as const, delay: 0 },
    { size: 8, opacity: 0.08, positionX: 70, positionY: 10, movementType: 'horizontal' as const, delay: 200 },
    { size: 16, opacity: 0.15, positionX: 10, positionY: 35, movementType: 'wave' as const, delay: 400 },
    { size: 12, opacity: 0.12, positionX: 80, positionY: 40, movementType: 'circular' as const, delay: 600 },
    { size: 8, opacity: 0.07, positionX: 55, positionY: 60, movementType: 'oscillate' as const, delay: 800 },
    { size: 16, opacity: 0.1, positionX: 25, positionY: 75, movementType: 'diagonal' as const, delay: 1000 },
    { size: 12, opacity: 0.05, positionX: 90, positionY: 80, movementType: 'sinus' as const, delay: 1200 },
    { size: 12, opacity: 0.08, positionX: 5, positionY: 90, movementType: 'cyclique' as const, delay: 1400 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  if (!isVisible) {
    return null;
  }

  return (
    <View className="flex-1 relative" style={{ backgroundColor: '#0062FF' }}>
      {/* Cubes animés en arrière-plan */}
      {cubes.map((cube, index) => (
        <AnimatedCube
          key={index}
          size={cube.size}
          opacity={cube.opacity}
          positionX={cube.positionX}
          positionY={cube.positionY}
          movementType={cube.movementType}
          delay={cube.delay}
        />
      ))}
      
      {/* Logo centré à ~60% de la hauteur */}
      <View className="flex-1 items-center justify-center" style={{ paddingTop: '10%' }}>
        <Image
          source={require('../assets/logo.png')}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}; 