import React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { X, AlertCircle, FileText, Flag } from 'lucide-react-native';

interface BottomDrawerContentProps {
  onClose: () => void;
}

export const BottomDrawerContent: React.FC<BottomDrawerContentProps> = ({ onClose }) => {
  return (
    <>
      {/* Handle du drawer */}
      <View className="items-center py-3">
        <View className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </View>

      {/* Header du drawer */}
      <View className="flex-row items-center justify-between px-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center">
          <View className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl mr-3">
            <FileText size={20} color="#3B82F6" />
          </View>
          <Text className="text-lg font-bold text-gray-900 dark:text-white">
            Nouveau Ticket
          </Text>
        </View>
        <TouchableOpacity
          onPress={onClose}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
          activeOpacity={0.7}
        >
          <X size={18} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Contenu du drawer */}
      <View className="flex-1 px-6 py-4">
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <AlertCircle size={14} color="#3B82F6" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              Titre du ticket *
            </Text>
          </View>
          <TextInput
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
            placeholder="Décrivez brièvement le problème..."
            placeholderTextColor="#9CA3AF"
            multiline={false}
          />
        </View>

        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Flag size={14} color="#EF4444" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              Priorité
            </Text>
          </View>
          <View className="flex-row space-x-2 gap-2">
            {[
              { label: 'Basse', color: '#10B981' },
              { label: 'Moyenne', color: '#F59E0B' },
              { label: 'Haute', color: '#EF4444' },
            ].map((priority, index) => (
              <TouchableOpacity
                key={index}
                className="flex-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-center">
                  <View 
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: priority.color }}
                  />
                  <Text className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {priority.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <FileText size={14} color="#6B7280" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              Description *
            </Text>
          </View>
          <TextInput
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
            placeholder="Décrivez le problème en quelques mots..."
            placeholderTextColor="#9CA3AF"
            multiline={true}
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={() => {
              console.log('Ticket créé !');
              onClose();
            }}
            className="flex-1 p-3 bg-blue-500 rounded-xl"
            activeOpacity={0.7}
          >
            <Text className="text-center font-semibold text-white">
              Créer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}; 