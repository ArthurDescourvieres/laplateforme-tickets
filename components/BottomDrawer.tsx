import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, AlertCircle, FileText, Flag } from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.55;

interface BottomDrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

export const BottomDrawer: React.FC<BottomDrawerProps> = ({ isVisible, onClose }) => {
  const insets = useSafeAreaInsets();
  
  const NAVBAR_MARGIN_BOTTOM = Math.max(insets.bottom, 16);
  const NAVBAR_HEIGHT = 72;
  const START_FROM_NAVBAR_CENTER = NAVBAR_MARGIN_BOTTOM + (NAVBAR_HEIGHT / 2);
  const SNAP_POINT = SCREEN_HEIGHT - DRAWER_HEIGHT - START_FROM_NAVBAR_CENTER;
  
  const HIDDEN_POSITION = SNAP_POINT + 100;
  const translateY = useSharedValue(HIDDEN_POSITION);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(SNAP_POINT, {
        damping: 20,
        stiffness: 300,
      });
      backdropOpacity.value = withTiming(0.5, { duration: 300 });
    } else {
      translateY.value = withTiming(HIDDEN_POSITION, { duration: 300 });
      backdropOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [isVisible, translateY, backdropOpacity, SNAP_POINT, HIDDEN_POSITION]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newY = SNAP_POINT + event.translationY;
      translateY.value = Math.max(newY, SNAP_POINT);
    })
    .onEnd((event) => {
      const shouldClose = 
        translateY.value > SNAP_POINT + 150 || 
        event.velocityY > 600;

      if (shouldClose) {
        translateY.value = withTiming(HIDDEN_POSITION, { duration: 300 });
        backdropOpacity.value = withTiming(0, { duration: 300 });
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(SNAP_POINT, {
          damping: 20,
          stiffness: 300,
        });
      }
    });

  const backdropTapGesture = Gesture.Tap()
    .onEnd(() => {
      translateY.value = withTiming(HIDDEN_POSITION, { duration: 300 });
      backdropOpacity.value = withTiming(0, { duration: 300 });
      runOnJS(onClose)();
    });

  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!isVisible) return null;

  return (
    <View className="absolute inset-0 z-40" pointerEvents={isVisible ? 'auto' : 'none'}>
      <GestureDetector gesture={backdropTapGesture}>
        <Animated.View 
          className="absolute inset-0 bg-black/50"
          style={backdropAnimatedStyle}
        />
      </GestureDetector>

      <View 
        className="absolute"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: NAVBAR_MARGIN_BOTTOM + (NAVBAR_HEIGHT / 2),
          overflow: 'hidden',
        }}
      >
        <GestureDetector gesture={panGesture}>
          <Animated.View
            className="absolute bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl"
            style={[
              drawerAnimatedStyle,
              {
                height: DRAWER_HEIGHT,
                left: 17,
                right: 17,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -8 },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                elevation: 25,
              },
            ]}
          >
          <View className="items-center py-3">
            <View className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </View>

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
              <View className="flex-row space-x-2">
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
                onPress={onClose}
                className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl"
                activeOpacity={0.7}
              >
                <Text className="text-center font-semibold text-gray-700 dark:text-gray-300">
                  Annuler
                </Text>
              </TouchableOpacity>
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
        </Animated.View>
      </GestureDetector>
      </View>
    </View>
  );
}; 