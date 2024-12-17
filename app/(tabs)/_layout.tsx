import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons, FontAwesome6 } from "@expo/vector-icons";
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeScreen from './index';
import TabTwoScreen from './explore';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();


  return (
    <Tab.Navigator
      initialRouteName='Main'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].text,
        tabBarStyle: {
          position: "absolute",
          // height: 80,
          borderRadius: Platform.OS === 'ios' ? 40 : 0,
          borderColor: "#f1f1f1",
          borderTopColor: Platform.OS === 'ios' ? 'transparent' : "#f1f1f1",
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: Platform.OS === 'ios' ? 30 : 90,
          elevation: 10,
          paddingTop: Platform.OS === 'ios' ? 15 : 0,
        },
      }}
    >
      <Tab.Screen
        name="Main"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 size={20} name='house' color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="explore"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 size={20} name="paper-plane" color={color} />
          ),
        }}
        component={TabTwoScreen}
      />
    </Tab.Navigator>
  );
}
