import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';

export const IconVariations = () => {
  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-4">🎨 Styles d'icônes disponibles :</Text>
      
      <View className="flex-row justify-around mb-4">
        <View className="items-center">
          <MaterialIcons name="home" size={32} color="#3B82F6" />
          <Text className="text-xs mt-1">MaterialIcons</Text>
        </View>
        <View className="items-center">
          <Ionicons name="home" size={32} color="#3B82F6" />
          <Text className="text-xs mt-1">Ionicons</Text>
        </View>
        <View className="items-center">
          <FontAwesome5 name="home" size={32} color="#3B82F6" />
          <Text className="text-xs mt-1">FontAwesome5</Text>
        </View>
      </View>

      <View className="flex-row justify-around">
        <View className="items-center">
          <Feather name="home" size={32} color="#3B82F6" />
          <Text className="text-xs mt-1">Feather</Text>
        </View>
        <View className="items-center">
          <AntDesign name="home" size={32} color="#3B82F6" />
          <Text className="text-xs mt-1">AntDesign</Text>
        </View>
      </View>
    </View>
  );
}; 