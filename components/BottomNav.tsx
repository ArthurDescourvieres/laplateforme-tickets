import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing 
} from 'react-native-reanimated';
import { Home, Plus, User } from 'lucide-react-native';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useSharedValue(0);
  const indicatorOpacity = useSharedValue(0);
  const previousActiveTab = useSharedValue('');

  // Fonction pour calculer la position cible en pixels
  const getTargetPosition = (tab: string): number => {
    if (containerWidth === 0) {
      return 0;
    }
    
    const tabWidth = containerWidth / 3;
    const indicatorWidth = 32; // w-8 = 32px
    
    const positions: Record<string, number> = {
      'home': (tabWidth * 0.5) - (indicatorWidth / 2),
      'add': (tabWidth * 1.5) - (indicatorWidth / 2), 
      'profile': (tabWidth * 2.5) - (indicatorWidth / 2),
    };
    
    return positions[tab] || 0;
  };

  // Animation du trait quand l'onglet actif change
  useEffect(() => {
    if (containerWidth > 0) {
      const targetPosition = getTargetPosition(activeTab);
      
      // Vérifier si c'est un vrai changement d'onglet
      const isFirstLoad = previousActiveTab.value === '';
      const hasTabChanged = activeTab !== previousActiveTab.value && !isFirstLoad;
      
      if (isFirstLoad) {
        // Premier chargement - Position directe
        translateX.value = targetPosition;
        // Animation douce d'apparition du trait
        indicatorOpacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
        previousActiveTab.value = activeTab;
      } else if (hasTabChanged) {
        // Changement d'onglet - Animation fluide
        translateX.value = withTiming(targetPosition, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
        
        // Mettre à jour l'onglet précédent APRÈS l'animation
        previousActiveTab.value = activeTab;
      } else {
        // Re-render du container - Position directe
        translateX.value = targetPosition;
        // S'assurer que le trait est visible
        if (indicatorOpacity.value === 0) {
          indicatorOpacity.value = 1;
        }
      }
    }
  }, [activeTab, containerWidth]);

  // Style animé pour le trait
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: indicatorOpacity.value,
  }));

  const NavButton = ({ 
    name, 
    IconComponent, 
    label 
  }: { 
    name: string; 
    IconComponent: React.ComponentType<any>; 
    label: string;
  }) => {
    const isActive = activeTab === name;
    
    return (
      <TouchableOpacity
        onPress={() => onTabChange(name)}
        className="flex-1 items-center justify-center py-4 relative"
        activeOpacity={0.7}
      >
        <IconComponent
          size={24}
          color={isActive ? '#3B82F6' : '#6B7280'}
          strokeWidth={isActive ? 2.5 : 2}
        />
        <Text className={`text-xs font-medium mt-1 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="absolute bottom-0 left-0 right-0">
      <View 
        className="bg-white/95 dark:bg-gray-900/95 mx-4 mb-8 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl relative"
        style={{ 
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.1,
          shadowRadius: 24,
          elevation: 12,
        }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setContainerWidth(width);
        }}
      >
        {/* Indicateur animé */}
        <Animated.View 
          className="absolute -top-0.5 h-1 w-8 bg-blue-500 rounded-full"
          style={animatedStyle}
        />
        
        <View className="flex-row">
          <NavButton
            name="home"
            IconComponent={Home}
            label="Accueil"
          />
          <NavButton
            name="add"
            IconComponent={Plus}
            label="Nouveau"
          />
          <NavButton
            name="profile"
            IconComponent={User}
            label="Profil"
          />
        </View>
      </View>
    </View>
  );
}; 