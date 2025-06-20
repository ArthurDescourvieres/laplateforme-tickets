import React, { useEffect } from 'react';
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
  animationType: 'breathX' | 'breathY' | 'floatX' | 'floatY';
  delay?: number;
}

export const AnimatedCube: React.FC<AnimatedCubeProps> = ({
  size,
  opacity,
  positionX,
  positionY,
  animationType,
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
  }, [delay, animationValue]);

  const animatedStyle = useAnimatedStyle(() => {
    let translateX = 0;
    let translateY = 0;

    // Animations subtiles de type "respiration" ou "flottement"
    const movement = interpolate(animationValue.value, [0, 1], [-1, 1]);

    switch (animationType) {
      case 'breathX':
        // Respiration horizontale douce (±6 à 10px)
        translateX = movement * (6 + Math.random() * 4);
        break;
      case 'breathY':
        // Respiration verticale douce (±6 à 10px)
        translateY = movement * (6 + Math.random() * 4);
        break;
      case 'floatX':
        // Flottement horizontal plus large
        translateX = movement * (8 + Math.random() * 2);
        break;
      case 'floatY':
        // Flottement vertical plus large
        translateY = movement * (8 + Math.random() * 2);
        break;
      default:
        break;
    }

    return {
      transform: [{ translateX }, { translateY }],
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
      // Coins nets, pas de border-radius
    />
  );
};
