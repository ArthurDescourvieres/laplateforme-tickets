import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface SimpleBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SimpleBottomNavWithIcons: React.FC<SimpleBottomNavProps> = ({ activeTab, onTabChange }) => {
  
  const NavButton = ({ 
    name, 
    IconComponent, 
    iconName, 
    label 
  }: { 
    name: string; 
    IconComponent: any; 
    iconName: string; 
    label: string;
  }) => {
    const isActive = activeTab === name;
    
    return (
      <TouchableOpacity
        onPress={() => onTabChange(name)}
        className="flex-1 items-center justify-center py-4"
        activeOpacity={0.7}
      >
        <IconComponent
          name={iconName}
          size={24}
          color={isActive ? '#3B82F6' : '#6B7280'}
        />
        <Text className={`text-xs font-medium mt-1 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
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
            IconComponent={MaterialIcons}
            iconName="home"
            label="Accueil"
          />
          <NavButton
            name="add"
            IconComponent={MaterialIcons}
            iconName="add-circle"
            label="Nouveau"
          />
          <NavButton
            name="profile"
            IconComponent={MaterialIcons}
            iconName="person"
            label="Profil"
          />
        </View>
      </View>
    </View>
  );
}; 