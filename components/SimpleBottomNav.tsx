import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface SimpleBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SimpleBottomNav: React.FC<SimpleBottomNavProps> = ({ activeTab, onTabChange }) => {
  
  const NavButton = ({ name, emoji, label }: { name: string; emoji: string; label: string }) => {
    const isActive = activeTab === name;
    
    return (
      <TouchableOpacity
        onPress={() => onTabChange(name)}
        className="flex-1 items-center justify-center py-4"
        activeOpacity={0.7}
      >
        <Text className="text-2xl mb-1">{emoji}</Text>
        <Text className={`text-xs font-medium ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
          {label}
        </Text>
        {isActive && (
          <View className="w-6 h-1 bg-blue-500 rounded-full mt-1" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="absolute bottom-0 left-0 right-0">
      <View className="bg-white dark:bg-gray-900 mx-4 mb-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <View className="flex-row">
          <NavButton
            name="home"
            emoji="🏠"
            label="Accueil"
          />
          <NavButton
            name="add"
            emoji="➕"
            label="Nouveau"
          />
          <NavButton
            name="profile"
            emoji="👤"
            label="Profil"
          />
        </View>
      </View>
    </View>
  );
}; 