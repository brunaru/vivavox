import { useEffect } from "react";
import Orientation from "react-native-orientation-locker";
import { NavigationContainer } from "@react-navigation/native";
import { useUser } from "../contexts/userContext";
import { SidebarProvider } from "../contexts/sideBarContext"
import { usePendingDeletionsProcessor } from "../hooks/usePendingDeletions";

import NoAuthNavigator from "./NoAuthNavigator";
import WithAuthNavigator from "./WithAuthNavigator";

export default function Routes() {
  const { user, loading, isAuthenticated } = useUser();
  usePendingDeletionsProcessor();

  useEffect(() => {
    Orientation.unlockAllOrientations();
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