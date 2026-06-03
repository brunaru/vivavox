import { useEffect } from "react";
import Orientation from "react-native-orientation-locker";
import { NavigationContainer } from "@react-navigation/native";
import { useUser } from "../contexts/userContext";
import { useDevice } from "../hooks/useDevice";

import NoAuthNavigator from "./NoAuthNavigator";
import WithAuthNavigator from "./WithAuthNavigator";

export default function Routes() {
  const { user, loading } = useUser();
  const { isTablet } = useDevice();
  const { isAuthenticated, loading } = useUser();

  useEffect(() => {
    if (isTablet) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }, []);
  
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