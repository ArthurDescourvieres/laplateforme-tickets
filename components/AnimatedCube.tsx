import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

interface AnimatedCubeProps {
  size: number;
  opacity: number;
  positionX: number; // en pourcentage
  positionY: number; // en pourcentage
  movementType: 'vertical' | 'horizontal' | 'circular' | 'diagonal' | 'wave' | 'oscillate' | 'sinus' | 'cyclique';
  delay?: number;
}

export const AnimatedCube: React.FC<AnimatedCubeProps> = ({
  size,
  opacity,
  positionX,
  positionY,
  movementType,
  delay = 0,
}) => {
  const animationValue = useSharedValue(0);

  useEffect(() => {
    // Démarrer l'animation avec un délai pour désynchroniser les cubes
    setTimeout(() => {
      animationValue.value = withRepeat(
        withTiming(1, {
          duration: 4000 + Math.random() * 2000, // 4-6 secondes avec variation
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // répétition infinie
        true // reverse (aller-retour)
      );
    }, delay);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => {
    let translateX = 0;
    let translateY = 0;

    switch (movementType) {
      case 'vertical':
        // Monte et redescend lentement
        translateY = interpolate(animationValue.value, [0, 1], [0, -20]);
        break;
      case 'horizontal':
        // Flotte vers la gauche puis droite
        translateX = interpolate(animationValue.value, [0, 1], [0, -15]);
        break;
      case 'circular':
        // Mouvement circulaire lent
        translateX = interpolate(animationValue.value, [0, 1], [0, 10]) * Math.cos(animationValue.value * Math.PI * 2);
        translateY = interpolate(animationValue.value, [0, 1], [0, 10]) * Math.sin(animationValue.value * Math.PI * 2);
        break;
      case 'diagonal':
        // Glissement diagonal
        translateX = interpolate(animationValue.value, [0, 1], [0, 12]);
        translateY = interpolate(animationValue.value, [0, 1], [0, 8]);
        break;
      case 'wave':
        // Descend en vague
        translateY = interpolate(animationValue.value, [0, 1], [0, 15]);
        translateX = interpolate(animationValue.value, [0, 1], [0, 8]) * Math.sin(animationValue.value * Math.PI * 3);
        break;
      case 'oscillate':
        // Oscillation verticale douce
        translateY = interpolate(animationValue.value, [0, 1], [-8, 8]);
        break;
      case 'sinus':
        // Sinus horizontal
        translateX = interpolate(animationValue.value, [0, 1], [-12, 12]) * Math.sin(animationValue.value * Math.PI * 2);
        break;
      case 'cyclique':
        // Mouvement en Y cyclique
        translateY = interpolate(animationValue.value, [0, 1], [-10, 10]) * Math.sin(animationValue.value * Math.PI * 4);
        break;
      default:
        break;
    }

    return {
      transform: [
        { translateX },
        { translateY },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: `${positionX}%`,
          top: `${positionY}%`,
          width: size,
          height: size,
          backgroundColor: '#FFFFFF',
          opacity: opacity,
        },
        animatedStyle,
      ]}
      className="rounded-sm"
    />
  );
}; 