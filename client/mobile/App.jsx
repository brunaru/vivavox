import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import InitialScreen from './src/screens/InitialScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserContextProvider } from './src/contexts/userContext';
import Routes from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserContextProvider } from './src/contexts/userContext';
import Routes from './src/navigation';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <InitialScreen />
      </SafeAreaView>
      <UserContextProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Routes/>  
      </UserContextProvider>
    </SafeAreaProvider>
  );
}