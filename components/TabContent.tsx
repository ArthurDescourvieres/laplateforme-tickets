import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Card } from './Card';

interface TabContentProps {
  activeTab: string;
  isDark: boolean;
}

export const TabContent: React.FC<TabContentProps> = ({ activeTab, isDark }) => {
  const fadeInVariants = {
    from: { opacity: 0, translateY: 20 },
    animate: { opacity: 1, translateY: 0 },
    transition: { type: 'timing', duration: 300 },
  };

  const renderHomeContent = () => (
    <ScrollView className="flex-1 px-6 pt-16" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
      <MotiView {...fadeInVariants}>
        <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          🏠 Accueil
        </Text>
        <Text className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Bienvenue sur votre plateforme de tickets !
        </Text>
      </MotiView>

      <MotiView 
        {...fadeInVariants}
        transition={{ ...fadeInVariants.transition, delay: 100 }}
      >
        <Card className="mb-4">
          <Text className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            📊 Statistiques
          </Text>
          <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Tickets ouverts: 5{'\n'}
            Tickets fermés: 12{'\n'}
            En attente: 3
          </Text>
        </Card>
      </MotiView>

      <MotiView 
        {...fadeInVariants}
        transition={{ ...fadeInVariants.transition, delay: 200 }}
      >
        <Card className="mb-4">
          <Text className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            🎯 Tickets récents
          </Text>
          <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            • Problème de connexion (#001){'\n'}
            • Demande de fonctionnalité (#002){'\n'}
            • Bug interface (#003)
          </Text>
        </Card>
      </MotiView>
    </ScrollView>
  );

  const renderAddContent = () => (
    <ScrollView className="flex-1 px-6 pt-16" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
      <MotiView {...fadeInVariants}>
        <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          ➕ Nouveau Ticket
        </Text>
        <Text className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Créez un nouveau ticket ici
        </Text>
      </MotiView>

      <MotiView 
        {...fadeInVariants}
        transition={{ ...fadeInVariants.transition, delay: 100 }}
      >
        <Card className="mb-4">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            📝 Formulaire de création
          </Text>
          <View className="space-y-4">
            <View className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Text className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Titre du ticket
              </Text>
            </View>
            <View className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Text className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </Text>
            </View>
            <View className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Text className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Priorité
              </Text>
            </View>
          </View>
        </Card>
      </MotiView>
    </ScrollView>
  );

  const renderProfileContent = () => (
    <ScrollView className="flex-1 px-6 pt-16" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
      <MotiView {...fadeInVariants}>
        <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          👤 Mon Compte
        </Text>
        <Text className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Gérez votre profil et vos paramètres
        </Text>
      </MotiView>

      <MotiView 
        {...fadeInVariants}
        transition={{ ...fadeInVariants.transition, delay: 100 }}
      >
        <Card className="mb-4">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            👨‍💻 Informations du profil
          </Text>
          <View className="space-y-3">
            <View>
              <Text className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Nom: John Doe
              </Text>
            </View>
            <View>
              <Text className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email: john.doe@exemple.com
              </Text>
            </View>
            <View>
              <Text className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Rôle: Développeur
              </Text>
            </View>
          </View>
        </Card>
      </MotiView>

      <MotiView 
        {...fadeInVariants}
        transition={{ ...fadeInVariants.transition, delay: 200 }}
      >
        <Card className="mb-4">
          <Text className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            ⚙️ Paramètres
          </Text>
          <View className="space-y-3">
            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              • Notifications push{'\n'}
              • Mode sombre{'\n'}
              • Langue{'\n'}
              • Confidentialité
            </Text>
          </View>
        </Card>
      </MotiView>
    </ScrollView>
  );

  switch (activeTab) {
    case 'home':
      return renderHomeContent();
    case 'add':
      return renderAddContent();
    case 'profile':
      return renderProfileContent();
    default:
      return renderHomeContent();
  }
}; 