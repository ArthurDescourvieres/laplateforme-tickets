import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LucideShowcase } from './LucideShowcase';

interface SimpleContentProps {
  activeTab: string;
  isDark: boolean;
}

export const SimpleContent = ({ activeTab, isDark }: SimpleContentProps) => {
  const insets = useSafeAreaInsets();
  
  const getContentByTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View 
            className="flex-1 px-6" 
            style={{ 
              paddingTop: Math.max(insets.top, 16), // Au minimum 16px, sinon la safe area du haut
              paddingLeft: Math.max(insets.left + 24, 24), // 24px = px-6, plus safe area si nécessaire
              paddingRight: Math.max(insets.right + 24, 24), // 24px = px-6, plus safe area si nécessaire
            }}
          >
            <Text className="text-2xl font-bold text-gray-900 mx-auto py-4 dark:text-white mb-4">
              Accueil
            </Text>

          </View>
        );
      case 'profile':
        return (
          <View 
            className="flex-1 px-6" 
            style={{ 
              paddingTop: Math.max(insets.top, 16), // Au minimum 16px, sinon la safe area du haut
              paddingLeft: Math.max(insets.left + 24, 24), // 24px = px-6, plus safe area si nécessaire
              paddingRight: Math.max(insets.right + 24, 24), // 24px = px-6, plus safe area si nécessaire
            }}
          >
            <Text className="text-2xl font-bold text-gray-900 py-4 mx-auto dark:text-white mb-4">
              Profil
            </Text>
          
          </View>
        );
      default:
        return (
          <View 
            className="flex-1 justify-center items-center px-6"
            style={{ 
              paddingTop: Math.max(insets.top, 16),
              paddingLeft: Math.max(insets.left + 24, 24),
              paddingRight: Math.max(insets.right + 24, 24),
            }}
          >
            <Text className="text-xl text-gray-500 dark:text-gray-400">
              Contenu non trouvé
            </Text>
          </View>
        );
    }
  };

  return (
    <ScrollView 
      className="flex-1"
      contentContainerStyle={{ 
        flexGrow: 1,
        paddingBottom: Math.max(insets.bottom + 120, 120), // 120px pour la navigation + safe area si nécessaire
      }}
      showsVerticalScrollIndicator={false}
    >
      {getContentByTab()}
    </ScrollView>
  );
}; 