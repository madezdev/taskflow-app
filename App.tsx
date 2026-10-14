import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TasksProvider } from './src/context/TasksContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <TasksProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </TasksProvider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
