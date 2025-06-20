import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Home, Plus, User } from 'lucide-react-native';

interface LucideBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const LucideBottomNav: React.FC<LucideBottomNavProps> = ({ activeTab, onTabChange }) => {
  
  const NavButton = ({ 
    name, 
    IconComponent, 
    label 
  }: { 
    name: string; 
    IconComponent: any; 
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
          size={24}
          color={isActive ? '#3B82F6' : '#6B7280'}
          strokeWidth={isActive ? 2.5 : 2}
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
              <View 
          className="bg-white/95 dark:bg-gray-900/95 mx-4 mb-8 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl"
          style={{ 
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.1,
            shadowRadius: 24,
            elevation: 12,
          }}
        >
        <View className="flex-row">
          <NavButton
            name="home"
            IconComponent={Home}
            label="Accueil"
          />
          <NavButton
            name="add"
            IconComponent={Plus}
            label="Nouveau"
          />
          <NavButton
            name="profile"
            IconComponent={User}
            label="Profil"
          />
        </View>
      </View>
    </View>
  );
}; 