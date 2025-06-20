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
    console.log('🎯 getTargetPosition appelée avec:', {
      tab,
      containerWidth,
      activeTab
    });
    
    if (containerWidth === 0) {
      console.log('⚠️ containerWidth est 0, retour 0');
      return 0;
    }
    
    const tabWidth = containerWidth / 3;
    const indicatorWidth = 32; // w-8 = 32px
    
    const positions: Record<string, number> = {
      'home': (tabWidth * 0.5) - (indicatorWidth / 2),
      'add': (tabWidth * 1.5) - (indicatorWidth / 2), 
      'profile': (tabWidth * 2.5) - (indicatorWidth / 2),
    };
    
    const result = positions[tab] || 0;
    console.log('📍 Positions calculées:', {
      tabWidth,
      indicatorWidth,
      positions,
      selectedTab: tab,
      targetPosition: result
    });
    
    return result;
  };

  // Animation du trait quand l'onglet actif change
  useEffect(() => {
    console.log('🔄 useEffect triggered:', {
      activeTab,
      previousActiveTab: previousActiveTab.value,
      containerWidth,
      currentTranslateX: translateX.value
    });
    
    if (containerWidth > 0) {
      const targetPosition = getTargetPosition(activeTab);
      console.log('🎯 Animation vers:', targetPosition);
      
      // Vérifier si c'est un vrai changement d'onglet
      const isFirstLoad = previousActiveTab.value === '';
      const hasTabChanged = activeTab !== previousActiveTab.value && !isFirstLoad;
      
      if (isFirstLoad) {
        console.log('🎬 Premier chargement - Position directe:', targetPosition);
        translateX.value = targetPosition;
        // Animation douce d'apparition du trait
        indicatorOpacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
        previousActiveTab.value = activeTab;
      } else if (hasTabChanged) {
        console.log('✅ Changement détecté:', previousActiveTab.value, '→', activeTab);
        console.log('💫 Animation de', translateX.value, 'vers', targetPosition);
        
        translateX.value = withTiming(targetPosition, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
        
        // Mettre à jour l'onglet précédent APRÈS l'animation
        previousActiveTab.value = activeTab;
      } else {
        console.log('🔄 Re-render du container, position directe:', targetPosition);
        translateX.value = targetPosition;
        // S'assurer que le trait est visible
        if (indicatorOpacity.value === 0) {
          indicatorOpacity.value = 1;
        }
      }
    } else {
      console.log('❌ Container pas encore mesuré - containerWidth:', containerWidth);
    }
  }, [activeTab, containerWidth]);

  // Style animé pour le trait
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: indicatorOpacity.value, // Animation douce d'apparition
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
        onPress={() => {
          console.log('🔘 Bouton cliqué:', name, '(ancien activeTab:', activeTab, ')');
          onTabChange(name);
        }}
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
          console.log('📏 onLayout - Container width:', width);
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