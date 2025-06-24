import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomDrawer } from './BottomDrawer';

export const TestDrawer = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900">
      <TouchableOpacity
        onPress={() => setIsDrawerVisible(true)}
        className="bg-blue-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">
          Ouvrir le Drawer
        </Text>
      </TouchableOpacity>

      <BottomDrawer 
        isVisible={isDrawerVisible} 
        onClose={() => setIsDrawerVisible(false)} 
      />
    </View>
  );
}; 