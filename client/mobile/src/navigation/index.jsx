import { useEffect } from "react";
import Orientation from "react-native-orientation-locker";
import { NavigationContainer } from "@react-navigation/native";
import { useUser } from "../contexts/userContext";
import { useDevice } from "../hooks/useDevice";
import { SidebarProvider } from "../contexts/sideBarContext"

import NoAuthNavigator from "./NoAuthNavigator";
import WithAuthNavigator from "./WithAuthNavigator";

export default function Routes() {
  const { user, loading, isAuthenticated } = useUser();
  const { isTablet } = useDevice();

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
      <SidebarProvider>
        {isAuthenticated ? (
          <WithAuthNavigator/>
        ) : (
          <NoAuthNavigator/>
        )}
      </SidebarProvider>
    </NavigationContainer>
  );
}