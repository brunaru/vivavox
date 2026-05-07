import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from '../screens/auth/InitialScreen';
import LoginScreen from '../screens/auth/LoginScreen';
const Stack = createNativeStackNavigator();

export default function AuthNavigator(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Initial' component={InitialScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    );
}

