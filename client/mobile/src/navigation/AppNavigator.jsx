import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='' component={} />
        </Stack.Navigator>
    );
}
