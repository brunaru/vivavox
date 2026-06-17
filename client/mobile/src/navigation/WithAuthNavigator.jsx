import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LibraryScreen from '../screens/withAuth/LibraryScreen';
import AboutScreen from '../screens/noAuth/AboutScreen';
import BoardScreen from '../screens/withAuth/BoardScreen'
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
