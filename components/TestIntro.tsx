import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { IntroScreen } from './IntroScreen';
import { Button } from './Button';

export const TestIntro: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);

  const startIntro = () => {
    setShowIntro(true);
  };

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroScreen onFinish={handleIntroFinish} duration={8000} />; // 8 secondes pour mieux voir
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Text className="mb-8 text-center text-2xl font-bold text-gray-900">
        🎯 Test de l&apos;écran d&apos;intro
      </Text>

      <Text className="mb-6 text-center text-base text-gray-600">
        Cliquez sur le bouton pour voir l&apos;animation des cubes
      </Text>

      <Button title="🚀 Démarrer l'intro" variant="primary" size="lg" onPress={startIntro} />

      <View className="mt-8 rounded-lg bg-white p-4">
        <Text className="text-center text-sm text-gray-500">
          ✨ 8 cubes blancs subtils (6-14px){'\n'}
          🎨 Fond bleu #0062FF{'\n'}
          🌀 Animations &quot;respiration&quot; et &quot;flottement&quot;{'\n'}
          📱 Positions aléatoires asymétriques{'\n'}
          ⏱️ Durée: 8 secondes (pour test)
        </Text>
      </View>
    </View>
  );
};
