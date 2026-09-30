import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ComponentProps } from 'react';
import { colors } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<keyof RootTabParamList, ComponentProps<typeof Ionicons>['name']> = {
  Home: 'list-outline',
  Profile: 'person-outline',
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Tareas' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
