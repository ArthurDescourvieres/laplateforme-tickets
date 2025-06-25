import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring,
  runOnJS,
  Easing 
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Plus, User, X, AlertCircle, FileText, Flag } from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.55;
const TOP_MARGIN = 60; // Marge depuis le haut de l'écran pour que le drawer reste visible

interface BottomNavWithDrawerProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavWithDrawer: React.FC<BottomNavWithDrawerProps> = ({ activeTab, onTabChange }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
  const insets = useSafeAreaInsets();

  // Animation values pour la navbar
  const translateX = useSharedValue(0);
  const indicatorOpacity = useSharedValue(0);
  const previousActiveTab = useSharedValue('');

  // Animation values pour le drawer
  const DRAWER_OPEN_POSITION = -(DRAWER_HEIGHT - TOP_MARGIN); // Position d'ouverture calculée
  const drawerTranslateY = useSharedValue(DRAWER_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  // Animation values pour l'icône Plus
  const plusIconRotation = useSharedValue(0);
  const plusIconScale = useSharedValue(1);

  // Fonction appelée à la fin de l'animation de sortie pour démonter le drawer
  const handleAnimationComplete = () => {
    setShouldRenderDrawer(false);
  };

  // Gérer l'ouverture/fermeture du drawer
  const handleAddPress = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  // Gérer les clics sur les boutons latéraux
  const handleTabPress = (tab: string) => {
    if (isDrawerVisible) {
      setIsDrawerVisible(false);
    }
    onTabChange(tab);
  };

  // Fonction pour calculer la position cible en pixels pour l'indicateur
  const getTargetPosition = (tab: string): number => {
    if (containerWidth === 0) {
      return 0;
    }
    
    const tabWidth = containerWidth / 3;
    const indicatorWidth = 32; // w-8 = 32px
    
    const positions: Record<string, number> = {
      'home': (tabWidth * 0.5) - (indicatorWidth / 2),
      'profile': (tabWidth * 2.5) - (indicatorWidth / 2),
    };
    
    return positions[tab] || 0;
  };

  // Animation du trait quand l'onglet actif change
  useEffect(() => {
    if (containerWidth > 0) {
      const targetPosition = getTargetPosition(activeTab);
      
      const isFirstLoad = previousActiveTab.value === '';
      const hasTabChanged = activeTab !== previousActiveTab.value && !isFirstLoad;
      const shouldShowIndicator = activeTab === 'home' || activeTab === 'profile';
      
      if (isFirstLoad) {
        translateX.value = targetPosition;
        indicatorOpacity.value = withTiming(shouldShowIndicator ? 1 : 0, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
        previousActiveTab.value = activeTab;
      } else if (hasTabChanged) {
        if (shouldShowIndicator) {
          translateX.value = withTiming(targetPosition, {
            duration: 300,
            easing: Easing.out(Easing.quad),
          });
        }
        
        indicatorOpacity.value = withTiming(shouldShowIndicator ? 1 : 0, {
          duration: 300,
          easing: Easing.out(Easing.quad),
        });
        
        previousActiveTab.value = activeTab;
      } else {
        translateX.value = targetPosition;
        indicatorOpacity.value = shouldShowIndicator ? 1 : 0;
      }
    }
  }, [activeTab, containerWidth, getTargetPosition, indicatorOpacity, previousActiveTab, translateX]);

  // Animation du drawer
  useEffect(() => {
    if (isDrawerVisible) {
      setShouldRenderDrawer(true);
      
      // Animation d'entrée douce et moderne (vient de en bas vers le haut)
      drawerTranslateY.value = withSpring(DRAWER_OPEN_POSITION, {
        damping: 30,
        stiffness: 200,
        mass: 1.2,
        overshootClamping: true,
      });
      backdropOpacity.value = withTiming(0.5, { duration: 400 });
    } else {
      // Animation de sortie douce et fluide (retourne vers le bas)
      drawerTranslateY.value = withSpring(DRAWER_HEIGHT, { 
        damping: 25,
        stiffness: 150,
        mass: 1.0,
      }, (finished) => {
        if (finished) {
          runOnJS(handleAnimationComplete)();
        }
      });
      backdropOpacity.value = withTiming(0, { duration: 350 });
    }
  }, [isDrawerVisible, drawerTranslateY, backdropOpacity]);

  // Animation de l'icône Plus
  useEffect(() => {
    if (isDrawerVisible) {
      plusIconRotation.value = withTiming(45, {
        duration: 400,
        easing: Easing.out(Easing.back(1.2)),
      });
      plusIconScale.value = withTiming(1.12, {
        duration: 400,
        easing: Easing.out(Easing.back(1.2)),
      });
    } else {
      plusIconRotation.value = withTiming(0, {
        duration: 450,
        easing: Easing.out(Easing.cubic),
      });
      plusIconScale.value = withTiming(1, {
        duration: 450,
        easing: Easing.out(Easing.back(1.1)),
      });
    }
  }, [isDrawerVisible, plusIconRotation, plusIconScale]);

  // Gestures pour le drawer
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newY = DRAWER_OPEN_POSITION + event.translationY;
      drawerTranslateY.value = Math.max(newY, DRAWER_OPEN_POSITION);
    })
    .onEnd((event) => {
      const shouldClose = 
        drawerTranslateY.value > DRAWER_OPEN_POSITION + 150 || 
        event.velocityY > 600;

      if (shouldClose) {
        drawerTranslateY.value = withSpring(DRAWER_HEIGHT, { 
          damping: 25,
          stiffness: 150,
          mass: 1.0,
        }, (finished) => {
          if (finished) {
            runOnJS(handleAnimationComplete)();
          }
        });
        backdropOpacity.value = withTiming(0, { duration: 350 });
        runOnJS(handleDrawerClose)();
      } else {
        drawerTranslateY.value = withSpring(DRAWER_OPEN_POSITION, {
          damping: 30,
          stiffness: 200,
          mass: 1.2,
          overshootClamping: true,
        });
      }
    });

  const backdropTapGesture = Gesture.Tap()
    .onEnd(() => {
      drawerTranslateY.value = withSpring(DRAWER_HEIGHT, { 
        damping: 25,
        stiffness: 150,
        mass: 1.0,
      }, (finished) => {
        if (finished) {
          runOnJS(handleAnimationComplete)();
        }
      });
      backdropOpacity.value = withTiming(0, { duration: 350 });
      runOnJS(handleDrawerClose)();
    });

  // Styles animés
  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: indicatorOpacity.value,
  }));

  const plusIconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${plusIconRotation.value}deg` },
      { scale: plusIconScale.value }
    ],
  }));

  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: drawerTranslateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  // Composant NavButton
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
        onPress={() => handleTabPress(name)}
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

  // Composant AddButton
  const AddButton = () => {
    return (
      <TouchableOpacity
        onPress={handleAddPress}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 items-center justify-center z-20"
        activeOpacity={0.8}
        style={{
          left: '50%',
          top: -12,
          transform: [{ translateX: -32 }],
        }}
      >
        <Animated.View 
          className={`w-16 h-16 rounded-full items-center justify-center shadow-lg ${
            isDrawerVisible ? 'bg-blue-600' : 'bg-blue-500'
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
        <Text className={`text-xs font-medium mt-1 ${isDrawerVisible ? 'text-blue-500' : 'text-blue-400'}`}>
          Nouveau
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 z-50">
      {/* Backdrop - visible seulement quand le drawer est ouvert */}
      {shouldRenderDrawer && (
        <GestureDetector gesture={backdropTapGesture}>
          <Animated.View 
            className="absolute inset-0 bg-black/50"
            style={[
              backdropAnimatedStyle,
              {
                top: -SCREEN_HEIGHT,
                bottom: 0,
              }
            ]}
            pointerEvents={isDrawerVisible ? 'auto' : 'none'}
          />
        </GestureDetector>
      )}

      {/* Container principal */}
      <View 
        className="bg-white dark:bg-gray-900 mx-4 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl relative"
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
          marginBottom: Math.max(insets.bottom, 16),
          overflow: 'visible', // Important pour permettre au drawer de sortir
        }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setContainerWidth(width);
        }}
      >
                 {/* Drawer - sort depuis la navbar */}
         {shouldRenderDrawer && (
           <GestureDetector gesture={panGesture}>
             <Animated.View
               className="absolute bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl"
               style={[
                 drawerAnimatedStyle,
                 {
                   height: DRAWER_HEIGHT,
                   left: 0,
                   right: 0,
                   bottom: 0, // Positionné au niveau de la navbar
                   shadowColor: '#000',
                   shadowOffset: { width: 0, height: -8 },
                   shadowOpacity: 0.15,
                   shadowRadius: 20,
                   elevation: 25,
                 },
               ]}
               pointerEvents={isDrawerVisible ? 'auto' : 'none'}
             >
              {/* Handle du drawer */}
              <View className="items-center py-3">
                <View className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </View>

              {/* Header du drawer */}
              <View className="flex-row items-center justify-between px-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <View className="flex-row items-center">
                  <View className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-3">
                    <FileText size={20} color="#3B82F6" />
                  </View>
                  <Text className="text-lg font-bold text-gray-900 dark:text-white">
                    Nouveau Ticket
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleDrawerClose}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                  activeOpacity={0.7}
                >
                  <X size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Contenu du drawer */}
              <View className="flex-1 px-6 py-4">
                <View className="mb-4">
                  <View className="flex-row items-center mb-2">
                    <AlertCircle size={14} color="#3B82F6" />
                    <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                      Titre du ticket *
                    </Text>
                  </View>
                  <TextInput
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    placeholder="Décrivez brièvement le problème..."
                    placeholderTextColor="#9CA3AF"
                    multiline={false}
                  />
                </View>

                <View className="mb-4">
                  <View className="flex-row items-center mb-2">
                    <Flag size={14} color="#EF4444" />
                    <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                      Priorité
                    </Text>
                  </View>
                  <View className="flex-row space-x-2 gap-2">
                    {[
                      { label: 'Basse', color: '#10B981' },
                      { label: 'Moyenne', color: '#F59E0B' },
                      { label: 'Haute', color: '#EF4444' },
                    ].map((priority, index) => (
                      <TouchableOpacity
                        key={index}
                        className="flex-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        activeOpacity={0.7}
                      >
                        <View className="flex-row items-center justify-center">
                          <View 
                            className="w-2 h-2 rounded-full mr-1"
                            style={{ backgroundColor: priority.color }}
                          />
                          <Text className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {priority.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="mb-6">
                  <View className="flex-row items-center mb-2">
                    <FileText size={14} color="#6B7280" />
                    <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                      Description *
                    </Text>
                  </View>
                  <TextInput
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                    placeholder="Décrivez le problème en quelques mots..."
                    placeholderTextColor="#9CA3AF"
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>

                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Ticket créé !');
                      handleDrawerClose();
                    }}
                    className="flex-1 p-3 bg-blue-500 rounded-xl"
                    activeOpacity={0.7}
                  >
                    <Text className="text-center font-semibold text-white">
                      Créer
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </GestureDetector>
        )}

        {/* Indicateur animé */}
        <Animated.View 
          className="absolute -top-0.5 h-1 w-8 bg-blue-500 rounded-full"
          style={indicatorAnimatedStyle}
        />
        
        {/* Bouton Plus */}
        <AddButton />
        
        {/* Barre de navigation */}
        <View className="flex-row">
          <NavButton
            name="home"
            IconComponent={Home}
            label="Accueil"
          />
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