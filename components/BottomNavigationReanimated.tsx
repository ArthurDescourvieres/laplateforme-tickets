import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  Extrapolate 
} from 'react-native-reanimated';
import Ionicons from '@react-native-vector-icons/ionicons';

interface BottomNavigationProps {
  onTabChange?: (tab: string) => void;
}

export const BottomNavigationReanimated: React.FC<BottomNavigationProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('home');
  const { width } = Dimensions.get('window');

  // Valeurs partagées pour les animations
  const slideUp = useSharedValue(100);
  const opacity = useSharedValue(0);

  // Animation d'entrée
  React.useEffect(() => {
    slideUp.value = withSpring(0, { damping: 20, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    onTabChange?.(tabName);
  };

  // Style animé pour l'entrée de la barre
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: slideUp.value }],
      opacity: opacity.value,
    };
  });

  const NavButton = ({ name, iconName, isActive }: { name: string; iconName: string; isActive: boolean }) => {
    const scale = useSharedValue(1);
    const rotateY = useSharedValue(0);
    const indicatorWidth = useSharedValue(0);
    const indicatorOpacity = useSharedValue(0);

    // Animations pour le bouton actif
    React.useEffect(() => {
      scale.value = withSpring(isActive ? 1.2 : 1, { damping: 15, stiffness: 150 });
      rotateY.value = withTiming(isActive ? 360 : 0, { duration: 300 });
      indicatorWidth.value = withTiming(isActive ? 32 : 0, { duration: 250 });
      indicatorOpacity.value = withTiming(isActive ? 1 : 0, { duration: 250 });
    }, [isActive]);

    // Styles animés pour le bouton
    const animatedButtonStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { scale: scale.value },
          { rotateY: `${rotateY.value}deg` }
        ],
        backgroundColor: isActive ? '#3B82F6' : 'transparent',
      };
    });

    // Style animé pour l'indicateur
    const animatedIndicatorStyle = useAnimatedStyle(() => {
      return {
        width: indicatorWidth.value,
        opacity: indicatorOpacity.value,
      };
    });

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleTabPress(name)}
        className="flex-1 items-center justify-center"
      >
        <Animated.View
          style={[animatedButtonStyle]}
          className="p-3 rounded-2xl"
        >
          <Ionicons
            name={iconName}
            size={24}
            color={isActive ? '#FFFFFF' : '#64748B'}
          />
        </Animated.View>
        
        {/* Indicateur animé en bas */}
        <Animated.View
          style={[animatedIndicatorStyle]}
          className="h-1 bg-blue-500 rounded-full mt-1"
        />
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      style={[animatedContainerStyle]}
      className="absolute bottom-0 left-0 right-0"
    >
      <View className="bg-white/95 dark:bg-gray-900/95 mx-4 mb-8 rounded-3xl shadow-2xl border border-gray-100/50 dark:border-gray-800/50">
        <View className="flex-row items-center justify-around py-4 px-2">
          <NavButton
            name="home"
            iconName="home"
            isActive={activeTab === 'home'}
          />
          <NavButton
            name="add"
            iconName="add-circle"
            isActive={activeTab === 'add'}
          />
          <NavButton
            name="profile"
            iconName="person"
            isActive={activeTab === 'profile'}
          />
        </View>
      </View>
    </Animated.View>
  );
}; 