import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppNavigator, navigation } from './navigator/navigation';
import { AppProvider } from './context/AppProvider';
import { HomeScreen } from './screens/HomeScreen';
export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
      {/* <HomeScreen /> */}
    </AppProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
