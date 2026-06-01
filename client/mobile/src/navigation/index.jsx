import { NavigationContainer } from "@react-navigation/native";
import { useUser } from "../contexts/userContext";

import NoAuthNavigator from "./NoAuthNavigator";
import WithAuthNavigator from "./WithAuthNavigator";

export default function Routes() {
  const { isAuthenticated, loading } = useUser();

  if (loading) return null; 

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <WithAuthNavigator/>
      ) : (
        <NoAuthNavigator/>
      )}
    </NavigationContainer>
  );
}