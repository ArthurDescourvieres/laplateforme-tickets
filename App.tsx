import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IntroScreen } from './components/IntroScreen';
import { BottomNav } from './components/BottomNav';
import { SimpleContent } from './components/SimpleContent';

import './global.css';

// 🎯 Contenu principal de l'application
const MainContent = ({ activeTab, isDark, onTabChange }: {
  activeTab: string;
  isDark: boolean;
  onTabChange: (tab: string) => void;
}) => {
  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SimpleContent activeTab={activeTab} isDark={isDark} />
      
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </View>
  );
};

export default function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showTestMode, setShowTestMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // 🚀 Intro avec préchargement du contenu en arrière-plan
  if (showIntro) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <IntroScreen onFinish={() => setShowIntro(false)} duration={4000}>
            <MainContent activeTab={activeTab} isDark={isDark} onTabChange={setActiveTab} />
          </IntroScreen>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  // Une fois l'intro terminée, afficher directement le contenu principal
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <MainContent activeTab={activeTab} isDark={isDark} onTabChange={setActiveTab} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
