import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { AnimatedCube } from './AnimatedCube';

interface IntroScreenProps {
  onFinish: () => void;
  duration?: number; // durée en millisecondes
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onFinish,
  duration = 3000, // 3 secondes par défaut
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Configuration des 8 cubes selon les nouvelles spécifications
  // Tailles aléatoires entre 6-14px, opacités entre 0.05-0.12
  // Positions dispersées de façon asymétrique, loin du logo (éviter zone 40-70% X et 45-75% Y)
  const cubes = [
    {
      size: 8,
      opacity: 0.08,
      positionX: 12,
      positionY: 18,
      animationType: 'breathY' as const,
      delay: 0,
    },
    {
      size: 6,
      opacity: 0.05,
      positionX: 78,
      positionY: 12,
      animationType: 'floatX' as const,
      delay: 400,
    },
    {
      size: 11,
      opacity: 0.09,
      positionX: 10,
      positionY: 84,
      animationType: 'breathX' as const,
      delay: 800,
    },
    {
      size: 14,
      opacity: 0.12,
      positionX: 85,
      positionY: 78,
      animationType: 'floatY' as const,
      delay: 1200,
    },
    {
      size: 7,
      opacity: 0.06,
      positionX: 25,
      positionY: 8,
      animationType: 'breathY' as const,
      delay: 600,
    },
    {
      size: 9,
      opacity: 0.07,
      positionX: 88,
      positionY: 25,
      animationType: 'floatX' as const,
      delay: 1000,
    },
    {
      size: 12,
      opacity: 0.1,
      positionX: 5,
      positionY: 35,
      animationType: 'breathX' as const,
      delay: 200,
    },
    {
      size: 10,
      opacity: 0.08,
      positionX: 92,
      positionY: 88,
      animationType: 'floatY' as const,
      delay: 1400,
    },
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
    <View className="relative flex-1" style={{ backgroundColor: '#0062FF' }}>
      {/* Cubes animés en arrière-plan */}
      {cubes.map((cube, index) => (
        <AnimatedCube
          key={index}
          size={cube.size}
          opacity={cube.opacity}
          positionX={cube.positionX}
          positionY={cube.positionY}
          animationType={cube.animationType}
          delay={cube.delay}
        />
      ))}

      {/* Logo centré à ~60% de la hauteur */}
      <View className="flex-1 items-center justify-center" style={{ paddingTop: '10%' }}>
        <Image
          source={require('../assets/logo.png')}
          className="h-16 w-auto"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
