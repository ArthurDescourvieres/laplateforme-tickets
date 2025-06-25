import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface NavbarMeasurements {
  // Mesures de la navbar réelles
  navbarWidth: number;
  navbarHeight: number;
  navbarMarginBottom: number;
  navbarHorizontalMargin: number;
  navbarAbsoluteBottom: number;
  
  // Calculs pour le drawer
  drawerSnapPoint: number;
  drawerLeft: number;
  drawerRight: number;
  
  // Méthodes
  onNavbarLayout: (width: number, height: number) => void;
  isReady: boolean;
}

export const useNavbarMeasurements = (): NavbarMeasurements => {
  const insets = useSafeAreaInsets();
  const [navbarWidth, setNavbarWidth] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  
  // Constantes partagées (exactement les mêmes que dans BottomNav)
  const navbarHorizontalMargin = 16; // mx-4 dans Tailwind = 16px
  const navbarMarginBottom = Math.max(insets.bottom, 16); // Même calcul que BottomNav
  
  // Position absolue du bas de la navbar depuis le bas de l'écran
  const navbarAbsoluteBottom = navbarMarginBottom;
  
  // Callback pour recevoir les mesures réelles de la navbar
  const onNavbarLayout = useCallback((width: number, height: number) => {
    setNavbarWidth(width);
    setNavbarHeight(height);
  }, []);
  
  // Calculs pour le drawer (basés sur les mesures réelles)
  const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.55;
  
  // Point d'accrochage du drawer : depuis le centre de la navbar
  const START_FROM_NAVBAR_CENTER = navbarMarginBottom + (navbarHeight / 2);
  const drawerSnapPoint = SCREEN_HEIGHT - DRAWER_HEIGHT - START_FROM_NAVBAR_CENTER;
  
  // Positionnement horizontal du drawer (aligné avec la navbar)
  const drawerLeft = navbarHorizontalMargin;
  const drawerRight = navbarHorizontalMargin;
  
  const isReady = navbarWidth > 0 && navbarHeight > 0;
  
  return {
    navbarWidth,
    navbarHeight,
    navbarMarginBottom,
    navbarHorizontalMargin,
    navbarAbsoluteBottom,
    drawerSnapPoint,
    drawerLeft,
    drawerRight,
    onNavbarLayout,
    isReady,
  };
}; 