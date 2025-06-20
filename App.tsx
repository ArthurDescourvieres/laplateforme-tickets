import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { IntroScreen } from './components/IntroScreen';
import { TestIntro } from './components/TestIntro';

import './global.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showTestMode, setShowTestMode] = useState(false);

  // Afficher l'intro si elle est active
  if (showIntro) {
    return <IntroScreen onFinish={() => setShowIntro(false)} duration={4000} />;
  }

  // Mode test pour l'intro
  if (showTestMode) {
    return <TestIntro />;
  }

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <ScrollView className="flex-1 px-4 pt-12">
        {/* En-tête */}
        <View className="mb-8 items-center">
          <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            🎉 Expo + NativeWind
          </Text>
          <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} text-center`}>
            Projet React Native avec Tailwind CSS
          </Text>
        </View>

        {/* Carte principale */}
        <Card variant="elevated" padding="lg" isDark={isDark} className="mb-6">
          <Text
            className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 text-center`}>
            Compteur: {count}
          </Text>

          <View className="mb-4 flex-row justify-center space-x-4">
            <Button
              title="-"
              variant="danger"
              size="lg"
              onPress={() => setCount(count - 1)}
              className="w-16"
            />

            <Button
              title="+"
              variant="primary"
              size="lg"
              onPress={() => setCount(count + 1)}
              className="w-16"
            />
          </View>

          <Button title="Reset" variant="secondary" onPress={() => setCount(0)} fullWidth />
        </Card>

        {/* Section fonctionnalités */}
        <Card variant="elevated" padding="lg" isDark={isDark} className="mb-6">
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            ✨ Fonctionnalités
          </Text>

          <View className="space-y-2">
            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              • 🎨 Tailwind CSS intégré
            </Text>
            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              • 📱 Compatible iOS/Android/Web
            </Text>
            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              • ⚡ Hot Reload activé
            </Text>
            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              • 🌙 Mode sombre/clair
            </Text>
            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              • 🧩 Composants réutilisables
            </Text>
          </View>
        </Card>

        {/* Bouton thème */}
        <Button
          title={isDark ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
          variant={isDark ? 'success' : 'primary'}
          size="lg"
          fullWidth
          onPress={() => setIsDark(!isDark)}
          className="mb-4"
        />

        {/* Bouton test intro */}
        <Button
          title="🎯 Tester l'intro"
          variant="secondary"
          size="md"
          fullWidth
          onPress={() => setShowTestMode(true)}
          className="mb-8"
        />

        {/* Footer */}
        <View className="items-center pb-8">
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center`}>
            Fait avec ❤️ et React Native
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
