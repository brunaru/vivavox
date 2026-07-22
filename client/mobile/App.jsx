import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DropProvider } from 'react-native-reanimated-dnd';

import { UserContextProvider } from './src/contexts/userContext';
import { BoardContextProvider } from './src/contexts/boardContext';
import { CellContextProvider } from './src/contexts/cellContext';
import { PageContextProvider } from './src/contexts/pageContext';
import { PhraseContextProvider } from './src/contexts/phraseContext';
import { DisplaySettingsProvider } from './src/contexts/displaySettingsContext';
import Routes from './src/navigation';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <UserContextProvider>
        <BoardContextProvider>
          <CellContextProvider>
            <PhraseContextProvider>
              <PageContextProvider>
                <DisplaySettingsProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <DropProvider>
                      <StatusBar barStyle={'light-content'} />
                      <Routes />
                    </DropProvider>
                  </GestureHandlerRootView>
                </DisplaySettingsProvider>
              </PageContextProvider>
            </PhraseContextProvider>
          </CellContextProvider>
        </BoardContextProvider>
      </UserContextProvider>
    </SafeAreaProvider>
  );
}