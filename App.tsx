import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { IntroScreen } from './components/IntroScreen';
import { LucideBottomNav } from './components/LucideBottomNav';
import { SimpleContent } from './components/SimpleContent';

import './global.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showTestMode, setShowTestMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // 🎯 Contenu principal de l'application
  const MainContent = () => {
    return (
      <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <SimpleContent activeTab={activeTab} isDark={isDark} />
        
        {/* Bouton pour basculer le mode sombre */}
        <View className="absolute top-12 right-6 z-50">
          <TouchableOpacity
            onPress={() => setIsDark(!isDark)}
            className={`p-3 rounded-full ${isDark ? 'bg-yellow-500' : 'bg-gray-800'} shadow-lg`}
            activeOpacity={0.8}
          >
            <Text className="text-xl">
              {isDark ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <LucideBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    );
  };

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
