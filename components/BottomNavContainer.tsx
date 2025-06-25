import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNav } from './BottomNavSimple';
import { BottomDrawerContent } from './BottomDrawerContent';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.55;

interface BottomNavContainerProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavContainer: React.FC<BottomNavContainerProps> = ({ activeTab, onTabChange }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
  const insets = useSafeAreaInsets();

  // Animation values
  const drawerTranslateY = useSharedValue(DRAWER_HEIGHT); // Caché en bas
  const backdropOpacity = useSharedValue(0);

  // Handlers
  const handleAddPress = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const handleTabPress = (tab: string) => {
    if (isDrawerVisible) {
      setIsDrawerVisible(false);
    }
    onTabChange(tab);
  };

  // Animation complete callback
  const handleAnimationComplete = () => {
    setShouldRenderDrawer(false);
  };

  // Animation du drawer
  React.useEffect(() => {
    if (isDrawerVisible) {
      setShouldRenderDrawer(true);
      
      // Animation d'entrée : drawer monte depuis le bas
      drawerTranslateY.value = withSpring(0, {
        damping: 30,
        stiffness: 200,
        mass: 1.2,
        overshootClamping: true,
      });
      backdropOpacity.value = withTiming(0.5, { duration: 400 });
    } else {
      // Animation de sortie : drawer redescend
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
  }, [isDrawerVisible]);

  // Gestures
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newY = event.translationY;
      drawerTranslateY.value = Math.max(newY, 0); // Ne peut pas monter au-dessus de 0
    })
    .onEnd((event) => {
      const shouldClose = 
        drawerTranslateY.value > 150 || 
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
        drawerTranslateY.value = withSpring(0, {
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
  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: drawerTranslateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <View className="absolute bottom-0 left-0 right-0 z-50">
      {/* Rectangle blanc pleine largeur pour masquer la partie basse du drawer */}
      <View 
        className="absolute bg-gray-100 dark:bg-gray-800"
        style={{
          bottom: 0,
          left: -1000, // Déborde largement à gauche
          right: -1000, // Déborde largement à droite  
          height: Math.max(insets.bottom, 16) + 40, // Du bas jusqu'au milieu de la navbar
          zIndex: 15, // Au-dessus du drawer (z-index 10) mais sous la navbar
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      />
      {/* Backdrop */}
      {shouldRenderDrawer && (
        <GestureDetector gesture={backdropTapGesture}>
          <Animated.View 
            className="absolute bg-black/50"
            style={[
              backdropAnimatedStyle,
              {
                top: -SCREEN_HEIGHT,
                left: 0,
                right: 0,
                bottom: 0,
              }
            ]}
            pointerEvents={isDrawerVisible ? 'auto' : 'none'}
          />
        </GestureDetector>
      )}

      {/* Container principal avec safe areas */}
      <View 
        style={{ 
          marginBottom: Math.max(insets.bottom, 16),
          marginHorizontal: 16,
          position: 'relative',
        }}
      >
        {/* Drawer - positionné au-dessus de la navbar dans le même container */}
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
                  bottom: '50%', // Commence au milieu vertical de la navbar
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: -8 },
                  shadowOpacity: 0.15,
                  shadowRadius: 20,
                  elevation: 25,
                  zIndex: 10, // Drawer en arrière-plan
                },
              ]}
              pointerEvents={isDrawerVisible ? 'auto' : 'none'}
            >
              <BottomDrawerContent onClose={handleDrawerClose} />
            </Animated.View>
          </GestureDetector>
        )}

                 {/* Navbar */}
         <View style={{ zIndex: 20 }}>
           <BottomNav 
             activeTab={activeTab}
             onTabChange={handleTabPress}
             onAddPress={handleAddPress}
             isDrawerVisible={isDrawerVisible}
           />
         </View>
      </View>
    </View>
  );
}; 