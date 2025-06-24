import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing 
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  // Animation pour l'icône Plus
  const plusIconRotation = useSharedValue(0);
  const plusIconScale = useSharedValue(1);

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
      
      // Le trait disparaît si on est sur le bouton 'add'
      const shouldShowIndicator = activeTab !== 'add';
      
      if (isFirstLoad) {
        // Premier chargement - Position directe
        translateX.value = targetPosition;
        // Animation douce d'apparition du trait seulement si ce n'est pas 'add'
        indicatorOpacity.value = withTiming(shouldShowIndicator ? 1 : 0, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
        previousActiveTab.value = activeTab;
      } else if (hasTabChanged) {
        // Changement d'onglet - Animation fluide
        if (shouldShowIndicator) {
          translateX.value = withTiming(targetPosition, {
            duration: 300,
            easing: Easing.out(Easing.quad),
          });
        }
        
        // Animation de l'opacité du trait
        indicatorOpacity.value = withTiming(shouldShowIndicator ? 1 : 0, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
        
        // Mettre à jour l'onglet précédent APRÈS l'animation
        previousActiveTab.value = activeTab;
      } else {
        // Re-render du container - Position directe
        translateX.value = targetPosition;
        // S'assurer que le trait a la bonne opacité
        indicatorOpacity.value = shouldShowIndicator ? 1 : 0;
      }
    }
  }, [activeTab, containerWidth]);

  // Animation de l'icône Plus
  useEffect(() => {
    if (activeTab === 'add') {
      // Animation d'activation : rotation 45° et légère augmentation de taille
      plusIconRotation.value = withTiming(45, {
        duration: 300,
        easing: Easing.out(Easing.back(1.5)),
      });
      plusIconScale.value = withTiming(1.1, {
        duration: 300,
        easing: Easing.out(Easing.back(1.5)),
      });
    } else {
      // Animation de désactivation : retour à 0° et taille normale
      plusIconRotation.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
      plusIconScale.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
    }
  }, [activeTab]);

  // Style animé pour le trait
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: indicatorOpacity.value,
  }));

  // Style animé pour l'icône Plus
  const plusIconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${plusIconRotation.value}deg` },
      { scale: plusIconScale.value }
    ],
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
    
    // Design normal pour les boutons latéraux (Home et Profile)
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

  // Bouton Plus séparé en position absolute
  const AddButton = () => {
    const isActive = activeTab === 'add';
    
    return (
      <TouchableOpacity
        onPress={() => onTabChange('add')}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 items-center justify-center z-10"
        activeOpacity={0.8}
        style={{
          // Position absolute centrée
          left: '50%',
          top: -12,
          transform: [{ translateX: -32 }], // -w-16/2 pour centrer
        }}
      >
        {/* Container du bouton */}
        <Animated.View 
          className={`w-16 h-16 rounded-full items-center justify-center shadow-lg ${
            isActive ? 'bg-blue-600' : 'bg-blue-500'
          }`}
          style={{
            shadowColor: '#3B82F6',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Animated.View style={plusIconAnimatedStyle}>
            <Plus
              size={28}
              color="white"
              strokeWidth={2.5}
            />
          </Animated.View>
        </Animated.View>
        <Text className={`text-xs font-medium mt-1 ${isActive ? 'text-blue-500' : 'text-blue-400'}`}>
          Nouveau
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="absolute bottom-0 left-0 right-0">
      <View 
        className="bg-white/95 dark:bg-gray-900/95 mx-4 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl relative"
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
          // 🛡️ Respecter les safe areas pour éviter les barres de navigation système
          marginBottom: Math.max(insets.bottom, 16), // Au minimum 16px (mb-4), sinon la safe area
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
        
        {/* Bouton Plus en position absolute */}
        <AddButton />
        
        {/* Barre de navigation avec seulement les boutons latéraux */}
        <View className="flex-row">
          <NavButton
            name="home"
            IconComponent={Home}
            label="Accueil"
          />
          {/* Espace central vide pour laisser la place au bouton Plus */}
          <View className="flex-1" />
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