import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LibraryScreen from '../screens/LibraryScreen';
import AboutScreen from '../screens/AboutScreen';
import BoardScreen from '../screens/BoardScreen'
import AppLayout from "./AppNavigationLayout"
const Stack = createNativeStackNavigator();

export default function WithAuthNavigator(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Library'>
              {() => (
                <AppLayout>
                  <LibraryScreen />
                </AppLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name='Board'> 
              {() => (
                <AppLayout>
                  <BoardScreen />
                </AppLayout>
              )}
            </Stack.Screen>
            <Stack.Screen name='About'>
              {() => (
                <AppLayout>
                  <AboutScreen />
                </AppLayout>
              )}
            </Stack.Screen>
        </Stack.Navigator>      
    );
}
