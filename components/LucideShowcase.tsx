import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { 
  Home, 
  Plus, 
  User, 
  Settings, 
  Bell, 
  Heart, 
  Star, 
  Search, 
  Menu, 
  Mail, 
  Phone, 
  Calendar,
  Camera,
  Download,
  Upload,
  Edit,
  Trash2,
  Check,
  X,
  ArrowLeft,
  ArrowRight
} from 'lucide-react-native';

export const LucideShowcase = () => {
  const IconDisplay = ({ IconComponent, name }: { IconComponent: any; name: string }) => (
    <View className="items-center m-2">
      <IconComponent size={28} color="#3B82F6" strokeWidth={2} />
      <Text className="text-xs mt-1 text-center">{name}</Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4 text-center">🎨 Icônes Lucide Disponibles</Text>
      
      <Text className="text-lg font-semibold mb-3">📱 Navigation</Text>
      <View className="flex-row flex-wrap justify-center mb-6">
        <IconDisplay IconComponent={Home} name="Home" />
        <IconDisplay IconComponent={Plus} name="Plus" />
        <IconDisplay IconComponent={User} name="User" />
        <IconDisplay IconComponent={Settings} name="Settings" />
        <IconDisplay IconComponent={Menu} name="Menu" />
        <IconDisplay IconComponent={Search} name="Search" />
      </View>

      <Text className="text-lg font-semibold mb-3">💌 Communication</Text>
      <View className="flex-row flex-wrap justify-center mb-6">
        <IconDisplay IconComponent={Mail} name="Mail" />
        <IconDisplay IconComponent={Phone} name="Phone" />
        <IconDisplay IconComponent={Bell} name="Bell" />
        <IconDisplay IconComponent={Calendar} name="Calendar" />
      </View>

      <Text className="text-lg font-semibold mb-3">⚡ Actions</Text>
      <View className="flex-row flex-wrap justify-center mb-6">
        <IconDisplay IconComponent={Edit} name="Edit" />
        <IconDisplay IconComponent={Trash2} name="Trash" />
        <IconDisplay IconComponent={Download} name="Download" />
        <IconDisplay IconComponent={Upload} name="Upload" />
        <IconDisplay IconComponent={Camera} name="Camera" />
      </View>

      <Text className="text-lg font-semibold mb-3">✨ Interface</Text>
      <View className="flex-row flex-wrap justify-center mb-6">
        <IconDisplay IconComponent={Heart} name="Heart" />
        <IconDisplay IconComponent={Star} name="Star" />
        <IconDisplay IconComponent={Check} name="Check" />
        <IconDisplay IconComponent={X} name="X" />
        <IconDisplay IconComponent={ArrowLeft} name="Left" />
        <IconDisplay IconComponent={ArrowRight} name="Right" />
      </View>

      <Text className="text-sm text-center text-gray-600 mt-4">
        🚀 1000+ icônes disponibles sur lucide.dev
      </Text>
    </ScrollView>
  );
}; 