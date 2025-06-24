import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LucideShowcase } from './LucideShowcase';

interface SimpleContentProps {
  activeTab: string;
  isDark: boolean;
}

export const SimpleContent = ({ activeTab, isDark }: SimpleContentProps) => {
  const getContentByTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View className="flex-1 p-6">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🏠 Accueil
            </Text>
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Plateforme de Tickets
              </Text>
              <Text className="text-gray-600 dark:text-gray-300 mb-4">
                Cliquez sur le bouton "+" en bas pour créer un nouveau ticket. Le formulaire s'ouvrira dans un drawer au-dessus de cette page.
              </Text>
              <View className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <Text className="text-blue-700 dark:text-blue-300 font-medium">
                  💡 Astuce : Vous pouvez fermer le drawer en glissant vers le bas ou en cliquant à l'extérieur.
                </Text>
              </View>
            </View>

            {/* Section statistiques */}
            <View className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📊 Statistiques des tickets
              </Text>
              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-red-500">12</Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">Ouverts</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-yellow-500">5</Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">En cours</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-green-500">28</Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">Fermés</Text>
                </View>
              </View>
            </View>
          </View>
        );
      case 'profile':
        return (
          <View className="flex-1 p-6">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              👤 Profil
            </Text>
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Paramètres du profil
              </Text>
              <Text className="text-gray-600 dark:text-gray-300">
                Gérez vos informations personnelles et préférences.
              </Text>
            </View>
          </View>
        );
      default:
        return (
          <View className="flex-1 justify-center items-center p-6">
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
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {getContentByTab()}
    </ScrollView>
  );
}; 