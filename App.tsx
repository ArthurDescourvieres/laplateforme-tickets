import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';

import './global.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <ScrollView className="flex-1 px-4 pt-12">
        {/* En-tête */}
        <View className="items-center mb-8">
          <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            🎉 Expo + NativeWind
          </Text>
          <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} text-center`}>
            Projet React Native avec Tailwind CSS
          </Text>
        </View>

        {/* Carte principale */}
        <Card variant="elevated" padding="lg" isDark={isDark} className="mb-6">
          <Text className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 text-center`}>
            Compteur: {count}
          </Text>
          
          <View className="flex-row justify-center space-x-4 mb-4">
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
          
          <Button 
            title="Reset"
            variant="secondary"
            onPress={() => setCount(0)}
            fullWidth
          />
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
        <TouchableOpacity 
          onPress={() => setIsDark(!isDark)}
          className={`${isDark ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-purple-500 hover:bg-purple-600'} px-6 py-4 rounded-xl mb-8`}
        >
          <Text className="text-white font-semibold text-center text-lg">
            {isDark ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
          </Text>
        </TouchableOpacity>

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
