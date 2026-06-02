import { useEffect } from "react";
import Orientation from "react-native-orientation-locker";
import { NavigationContainer } from "@react-navigation/native";
import { useUser } from "../contexts/userContext";
import { useDevice } from "../hooks/useDevice";

import NoAuthNavigator from "./NoAuthNavigator";

export default function Routes() {
  const { user, loading } = useUser();
  const { isTablet } = useDevice();

  useEffect(() => {
    if (isTablet) {
      Orientation.unlockAllOrientations();
    } else {
      Orientation.lockToPortrait();
    }

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, [isTablet]);
  
  if (loading) return null; 

  return (
    <NavigationContainer>
       <NoAuthNavigator/>
    </NavigationContainer>
  );
}