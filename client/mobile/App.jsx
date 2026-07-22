import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserContextProvider } from './src/contexts/userContext';
import { BoardContextProvider } from './src/contexts/boardContext';
import Routes from './src/navigation';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <UserContextProvider>
        <BoardContextProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Routes/>
        </BoardContextProvider>  
      </UserContextProvider>
    </SafeAreaProvider>
  );
}