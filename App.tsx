import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { IntroScreen } from './components/IntroScreen';

import './global.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showTestMode, setShowTestMode] = useState(false);

  // 🎯 Contenu principal de l'application
  const MainContent = () => (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Text className='dark:text-black mt-10 text-center text-2xl font-bold'>Hello</Text>
    </View>
  );

  // 🚀 Intro avec préchargement du contenu en arrière-plan
  if (showIntro) {
    return (
      <IntroScreen onFinish={() => setShowIntro(false)} duration={4000}>
        <MainContent />
      </IntroScreen>
    );
  }

  // Une fois l'intro terminée, afficher directement le contenu principal
  return <MainContent />;
}
