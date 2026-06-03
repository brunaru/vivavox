import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LibraryScreen from '../screens/withAuth/LibraryScreen';

const Stack = createNativeStackNavigator();

export default function WithAuthNavigator(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Library' component={LibraryScreen}/>
        </Stack.Navigator>
    );
}
