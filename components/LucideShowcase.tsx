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
  const IconDisplay = ({ icon: IconComponent, name }: { icon: React.ComponentType<any>; name: string }) => (
    <View className="items-center m-2">
      <IconComponent size={28} color="#3B82F6" strokeWidth={2} />
      <Text className="text-xs mt-1 text-center">{name}</Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 p-4 mt-20">
      <Text className="text-2xl font-bold mb-4 text-center">🎨 Icônes Lucide Disponibles</Text>
      
      <Text className="text-lg font-semibold mb-3">📱 Navigation</Text>
      <View className="flex-row flex-wrap justify-center mb-6">
        <IconDisplay icon={Home} name="Home" />
        <IconDisplay icon={Plus} name="Plus" />
        <IconDisplay icon={User} name="User" />
        <IconDisplay icon={Settings} name="Settings" />
        <IconDisplay icon={Menu} name="Menu" />
        <IconDisplay icon={Search} name="Search" />
      </View>

      <Text className="text-lg font-semibold mb-3">💌 Communication</Text>
      <View className="flex-row flex-wrap justify-center mb-6">
        <IconDisplay icon={Mail} name="Mail" />
        <IconDisplay icon={Phone} name="Phone" />
        <IconDisplay icon={Bell} name="Bell" />
        <IconDisplay icon={Calendar} name="Calendar" />
      </View>

      <Text className="text-lg font-semibold mb-3">⚡ Actions</Text>
      <View className="flex-row flex-wrap justify-center mb-6">
        <IconDisplay icon={Edit} name="Edit" />
        <IconDisplay icon={Trash2} name="Trash" />
        <IconDisplay icon={Download} name="Download" />
        <IconDisplay icon={Upload} name="Upload" />
        <IconDisplay icon={Camera} name="Camera" />
      </View>

      <Text className="text-lg font-semibold mb-3">✨ Interface</Text>
      <View className="flex-row flex-wrap justify-center mb-6">
        <IconDisplay icon={Heart} name="Heart" />
        <IconDisplay icon={Star} name="Star" />
        <IconDisplay icon={Check} name="Check" />
        <IconDisplay icon={X} name="X" />
        <IconDisplay icon={ArrowLeft} name="Left" />
        <IconDisplay icon={ArrowRight} name="Right" />
      </View>

      <Text className="text-sm text-center text-gray-600 mt-4">
        🚀 1000+ icônes disponibles sur lucide.dev
      </Text>
    </ScrollView>
  );
}; 