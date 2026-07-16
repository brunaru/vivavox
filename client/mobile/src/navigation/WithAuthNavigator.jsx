import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LibraryScreen from '../screens/LibraryScreen';
import AboutScreen from '../screens/AboutScreen';
import BoardScreen from '../screens/BoardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import VoiceSettings from '../screens/SettingsScreen/VoiceSettings'
import DisplaySettings from '../screens/SettingsScreen/DisplaySettings';
import AppLayout from "./AppNavigationLayout";

const Stack = createNativeStackNavigator();

function WrapLayout(Component) {
  return (props) => (
    <AppLayout>
      <Component {...props} />
    </AppLayout>
  );
}

export default function WithAuthNavigator(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Library' component={WrapLayout(LibraryScreen)} />
            <Stack.Screen name='Board' component={WrapLayout(BoardScreen)} />
            <Stack.Screen name='About' component={WrapLayout(AboutScreen)} />
            <Stack.Screen name='Settings' component={WrapLayout(SettingsScreen)} />
            <Stack.Screen name='VoiceSettings' component={WrapLayout(VoiceSettings)} />
            <Stack.Screen name='DisplaySettings' component={WrapLayout(DisplaySettings)} />
        </Stack.Navigator>      
    );
}