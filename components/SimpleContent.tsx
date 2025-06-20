import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LucideShowcase } from './LucideShowcase';

interface SimpleContentProps {
  activeTab: string;
  isDark: boolean;
}

export const SimpleContent: React.FC<SimpleContentProps> = ({ activeTab, isDark }) => {
  
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView className="flex-1 px-6 pt-16 pb-32" showsVerticalScrollIndicator={false}>
            <Text className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              🏠 Accueil
            </Text>
            <Text className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Bienvenue sur votre plateforme de tickets !
            </Text>
            
            <View className={`p-6 rounded-2xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <Text className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                📊 Statistiques
              </Text>
              <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                • Tickets ouverts: 5{'\n'}
                • Tickets fermés: 12{'\n'}
                • En attente: 3
              </Text>
            </View>

            <View className={`p-6 rounded-2xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <Text className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                🎯 Tickets récents
              </Text>
              <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                • Problème de connexion (#001){'\n'}
                • Demande de fonctionnalité (#002){'\n'}
                • Bug interface (#003)
              </Text>
            </View>
          </ScrollView>
        );

      case 'add':
        return (
          <ScrollView className="flex-1 px-6 pt-16 pb-32" showsVerticalScrollIndicator={false}>
            <Text className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              ➕ Nouveau Ticket
            </Text>
            <Text className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Créez un nouveau ticket ici
            </Text>
            
            <View className={`p-6 rounded-2xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                📝 Nouveau ticket
              </Text>
              <View className="space-y-4">
                <View className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Text className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    📌 Titre du ticket
                  </Text>
                </View>
                <View className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Text className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    📄 Description détaillée
                  </Text>
                </View>
                <View className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Text className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    ⚡ Priorité du ticket
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case 'profile':
        return <LucideShowcase />;

      default:
        return (
          <View className="flex-1 items-center justify-center">
            <Text className={`text-xl ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Page non trouvée
            </Text>
          </View>
        );
    }
  };

  return renderContent();
}; 