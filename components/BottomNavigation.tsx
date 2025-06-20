import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import Ionicons from '@react-native-vector-icons/ionicons';

interface BottomNavigationProps {
  onTabChange?: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('home');
  const { width } = Dimensions.get('window');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    onTabChange?.(tabName);
  };

  const NavButton = ({ name, iconName, isActive }: { name: string; iconName: string; isActive: boolean }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleTabPress(name)}
      className="flex-1 items-center justify-center"
    >
      <MotiView
        animate={{
          scale: isActive ? 1.2 : 1,
          backgroundColor: isActive ? '#3B82F6' : 'transparent',
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 150,
        }}
        className="p-3 rounded-2xl"
      >
        <MotiView
          animate={{
            rotateY: isActive ? '360deg' : '0deg',
          }}
          transition={{
            type: 'timing',
            duration: 300,
          }}
        >
          <Ionicons
            name={iconName}
            size={24}
            color={isActive ? '#FFFFFF' : '#64748B'}
          />
        </MotiView>
      </MotiView>
      
      {/* Indicateur animé en bas */}
      <MotiView
        animate={{
          width: isActive ? 32 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          type: 'timing',
          duration: 250,
        }}
        className="h-1 bg-blue-500 rounded-full mt-1"
      />
    </TouchableOpacity>
  );

  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: 300,
      }}
      className="absolute bottom-0 left-0 right-0"
    >
      <View className="bg-white/95 dark:bg-gray-900/95 mx-4 mb-8 rounded-3xl shadow-2xl border border-gray-100/50 dark:border-gray-800/50 backdrop-blur-xl">
        <View className="flex-row items-center justify-around py-4 px-2">
          <NavButton
            name="home"
            iconName="home"
            isActive={activeTab === 'home'}
          />
          <NavButton
            name="add"
            iconName="add-circle"
            isActive={activeTab === 'add'}
          />
          <NavButton
            name="profile"
            iconName="person"
            isActive={activeTab === 'profile'}
          />
        </View>
      </View>
    </MotiView>
  );
}; 