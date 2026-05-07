import { NavigationContainer } from "@react-navigation/native";
import { useUser } from "../contexts/userContext";

import AuthNavigator from "./AuthNavigator";

export default function Routes() {
  const { user, loading } = useUser();

  if (loading) return null; 

  return (
    <NavigationContainer>
       <AuthNavigator />
    </NavigationContainer>
  );
}