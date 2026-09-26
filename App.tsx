import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileScreen />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
