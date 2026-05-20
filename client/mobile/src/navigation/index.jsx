import { NavigationContainer } from "@react-navigation/native";
import { useUser } from "../contexts/userContext";

import NoAuthNavigator from "./NoAuthNavigator";

export default function Routes() {
  const { user, loading } = useUser();

  if (loading) return null; 

  return (
    <NavigationContainer>
       <NoAuthNavigator/>
    </NavigationContainer>
  );
}