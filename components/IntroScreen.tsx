import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withDelay,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';

interface IntroScreenProps {
  onFinish: () => void;
  duration?: number;
  children?: React.ReactNode; // Contenu principal à précharger
}

// 🎯 Logo SVG de La Plateforme_ (vectoriel, parfaitement net)
const logoSvg = `<svg width="6587" height="616" viewBox="0 0 6587 616" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1343.77 0H1228.41V603.281H1560.55V502.101H1343.77V0Z" fill="white"/>
<path d="M1940.86 202.358C1940.86 225.124 1942.13 232.712 1942.13 239.036H1938.32C1916.77 199.829 1867.33 173.27 1803.95 173.27C1684.78 173.27 1596.04 264.331 1596.04 394.599C1596.04 524.867 1679.71 615.928 1798.87 615.928C1862.26 615.928 1914.24 588.104 1938.32 545.103H1942.13C1940.86 553.956 1940.86 565.339 1940.86 584.31V603.281H2043.54V185.917H1940.86V202.358ZM1822.96 516.014C1758.31 516.014 1710.14 465.424 1710.14 393.334C1710.14 321.244 1758.31 271.919 1822.96 271.919C1888.88 271.919 1937.05 321.244 1937.05 393.334C1935.79 465.424 1888.88 516.014 1822.96 516.014Z" fill="white"/>
<path d="M2351.59 603.281H2465.69V390.804H2772.47V0H2351.59V603.281ZM2465.69 99.9144H2658.38V293.42H2465.69V99.9144Z" fill="white"/>
<path d="M2981.64 0H2868.82V603.281H3069.12V504.631H2981.64V0Z" fill="white"/>
<path d="M3449.43 202.358C3449.43 225.124 3450.7 232.712 3450.7 239.036H3446.89C3425.34 199.829 3375.9 173.27 3312.52 173.27C3193.35 173.27 3104.61 264.331 3104.61 394.599C3104.61 524.867 3188.28 615.928 3307.44 615.928C3370.83 615.928 3422.81 588.104 3446.89 545.103H3450.7C3449.43 553.956 3449.43 565.339 3449.43 584.31V603.281H3552.11V185.917H3449.43V202.358ZM3331.53 516.014C3266.88 516.014 3218.71 465.424 3218.71 393.334C3218.71 321.244 3265.61 271.919 3331.53 271.919C3397.45 271.919 3445.62 321.244 3445.62 393.334C3444.36 465.424 3397.45 516.014 3331.53 516.014Z" fill="white"/>
<path d="M3791.71 80.9434H3678.88V185.917H3639.58V283.302H3678.88V603.281H3875.38V504.631H3791.71V283.302H3888.05V185.917H3791.71V80.9434Z" fill="white"/>
<path d="M4154.27 173.27C4024.97 173.27 3932.42 264.331 3932.42 394.599C3932.42 522.338 4023.7 615.928 4156.81 615.928C4227.8 615.928 4284.85 590.633 4327.95 534.985L4263.3 466.689C4235.41 500.837 4204.98 516.014 4158.08 516.014C4099.76 516.014 4061.73 484.395 4050.32 430.012H4357.11C4359.64 419.894 4360.91 405.982 4360.91 394.599C4358.37 265.595 4275.97 173.27 4154.27 173.27ZM4047.79 357.921C4059.19 303.538 4095.96 270.654 4150.47 270.654C4202.45 270.654 4239.21 304.802 4246.81 357.921H4047.79Z" fill="white"/>
<path d="M4452.18 185.917H4412.88V283.302H4452.18V603.281H4565.01V283.302H4658.82V185.917H4565.01V93.5907H4660.09V0H4452.18V185.917Z" fill="white"/>
<path d="M4914.9 173.27C4785.59 173.27 4691.78 265.595 4691.78 394.599C4691.78 522.338 4785.59 615.928 4914.9 615.928C5044.2 615.928 5139.28 522.338 5139.28 394.599C5139.28 265.595 5044.2 173.27 4914.9 173.27ZM4914.9 516.014C4850.24 516.014 4804.61 465.424 4804.61 393.334C4804.61 321.244 4850.24 271.919 4914.9 271.919C4980.82 271.919 5025.19 321.244 5025.19 393.334C5025.19 465.424 4980.82 516.014 4914.9 516.014Z" fill="white"/>
<path d="M5221.68 603.281H5334.51V285.831H5421.98V185.917H5221.68V603.281Z" fill="white"/>
<path d="M5494.24 603.281H5607.06V283.302H5730.03V603.281H5841.59V283.302H5964.56V603.281H6077.38V185.917H5494.24V603.281Z" fill="white"/>
<path d="M6587 394.599C6587 265.595 6504.6 173.27 6382.9 173.27C6253.59 173.27 6161.05 264.331 6161.05 394.599C6161.05 522.338 6252.33 615.928 6385.43 615.928C6456.43 615.928 6513.47 590.633 6556.57 534.985L6491.92 466.689C6464.03 500.837 6433.61 516.014 6386.7 516.014C6328.39 516.014 6290.36 484.395 6278.95 430.012H6585.73C6585.73 419.894 6587 405.982 6587 394.599ZM6276.41 357.921C6287.82 303.538 6324.58 270.654 6379.1 270.654C6431.07 270.654 6467.84 304.802 6475.44 357.921H6276.41Z" fill="white"/>
<path d="M0 0V352.862H138.18V513.484C126.771 510.955 119.164 504.631 107.755 495.778C86.204 479.336 55.779 455.306 1.26769 455.306V555.22C22.8187 555.22 30.4249 561.544 48.1728 574.192C69.7238 590.633 100.149 614.663 154.66 614.663C210.439 614.663 239.596 591.898 261.147 574.192C277.628 561.544 286.501 555.22 308.052 555.22C329.603 555.22 337.21 561.544 354.958 574.192C376.509 590.633 406.933 614.663 461.445 614.663C515.956 614.663 546.381 591.898 567.932 574.192C584.412 561.544 593.286 555.22 614.837 555.22C636.388 555.22 643.995 561.544 661.742 574.192C683.293 590.633 713.718 614.663 768.23 614.663C824.009 614.663 853.166 591.898 874.717 574.192C891.197 561.544 900.071 555.22 921.622 555.22V455.306C865.843 455.306 836.686 478.071 815.135 495.778C803.726 504.631 796.119 510.955 784.71 513.484V352.862H921.622V0H0ZM682.026 470.483C664.278 461.63 642.727 455.306 613.57 455.306C557.79 455.306 528.633 478.071 507.082 495.778C490.602 508.425 481.728 514.749 460.177 514.749C438.626 514.749 431.02 508.425 413.272 495.778C391.721 479.336 361.296 455.306 306.785 455.306C277.628 455.306 256.077 461.63 238.329 470.483V352.862H682.026V470.483ZM100.149 101.179H818.938V252.948H100.149V101.179Z" fill="white"/>
</svg>`;

// 🧩 Configuration de la grille de cubes carrés
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CUBE_SIZE = Math.min(screenWidth, screenHeight) / 10; // Cubes carrés parfaits
const COLS = Math.ceil(screenWidth / CUBE_SIZE);   // Colonnes nécessaires pour couvrir la largeur
const ROWS = Math.ceil(screenHeight / CUBE_SIZE);  // Rangées nécessaires pour couvrir la hauteur

// 🎯 Génération des données de cubes avec positions et délais
const generateCubes = () => {
  const cubes = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      cubes.push({
        id: `${row}-${col}`,
        row,
        col,
        left: col * CUBE_SIZE,
        top: row * CUBE_SIZE,
        // 🌊 Délai diagonal pour effet de propagation élégant
        delay: (row + col) * 60, // 60ms entre chaque cube sur la diagonale
      });
    }
  }
  return cubes;
};

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onFinish,
  duration = 3000,
  children,
}) => {
  const [showCubes, setShowCubes] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);
  
  // 🎭 Animation de transition finale
  const introOpacity = useSharedValue(1);
  
  const cubes = generateCubes();

  const handleFinish = () => {
    // 🎭 Transition fluide : fondu de l'intro vers le contenu
    introOpacity.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    }, (finished) => {
      if (finished) {
        runOnJS(onFinish)();
      }
    });
  };

  useEffect(() => {
    // 🚀 Préchargement immédiat du contenu en arrière-plan
    setIsContentReady(true);
    
    // 📅 Phase 1 : Affichage statique du logo pendant 1 seconde
    const logoTimer = setTimeout(() => {
      setShowCubes(true);
    }, 1000);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (showCubes) {
      // 📅 Phase 2 : Animation des cubes avec délais échelonnés
      const maxDelay = Math.max(...cubes.map(cube => cube.delay));
      const animationDuration = 400; // Durée d'animation de chaque cube
      const totalDuration = maxDelay + animationDuration + 200; // +200ms de marge
      
      // 🏁 Fin de l'intro après que tous les cubes soient apparus
      const finishTimer = setTimeout(() => {
        runOnJS(handleFinish)();
      }, totalDuration);

      return () => clearTimeout(finishTimer);
    }
  }, [showCubes, cubes]);

  // 🎨 Style animé pour la couche intro
  const introAnimatedStyle = useAnimatedStyle(() => ({
    opacity: introOpacity.value,
  }));

  return (
    <View className="relative flex-1">
      {/* 🎯 Contenu principal (préchargé en arrière-plan) */}
      {isContentReady && children && (
        <View className="absolute inset-0" style={{ zIndex: 1 }}>
          {children}
        </View>
      )}

      {/* 🎭 Couche d'animation (par-dessus le contenu) */}
      <Animated.View 
        className="absolute inset-0" 
        style={[
          { backgroundColor: '#0062FF', zIndex: 10, elevation: 20 }, 
          introAnimatedStyle
        ]}
      >
        {/* 🎯 Logo centré (affichage statique) */}
        <View className="flex-1 items-center justify-center px-8">
          <SvgXml
            xml={logoSvg}
            width={280}
            height={42}
          />
        </View>

        {/* 🧩 Grille de cubes blancs animés */}
        {showCubes && cubes.map((cube) => (
          <CubeComponent
            key={cube.id}
            left={cube.left}
            top={cube.top}
            width={CUBE_SIZE}
            height={CUBE_SIZE}
            delay={cube.delay}
          />
        ))}
      </Animated.View>
    </View>
  );
};

// 🧩 Composant Cube individuel avec animation
interface CubeComponentProps {
  left: number;
  top: number;
  width: number;
  height: number;
  delay: number;
}

const CubeComponent: React.FC<CubeComponentProps> = ({
  left,
  top,
  width,
  height,
  delay,
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // 🎭 Animation: apparition avec scale + opacity
    scale.value = withDelay(delay, withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.back(1.2)), // Petit effet "bounce" élégant
    }));
    
    opacity.value = withDelay(delay, withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.quad),
    }));
  }, [delay, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          left,
          top,
          width,
          height,
          backgroundColor: 'white',
        },
      ]}
    />
  );
};
