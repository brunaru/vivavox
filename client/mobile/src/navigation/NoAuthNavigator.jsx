import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from '../screens/noAuth/InitialScreen';
import LoginScreen from '../screens/noAuth/LoginScreen';
import SignUpScreen from '../screens/noAuth/SignUpScreen';
const Stack = createNativeStackNavigator();

export default function NoAuthNavigator(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Initial' component={InitialScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            {/*<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />*/}
        </Stack.Navigator>
    );
}

