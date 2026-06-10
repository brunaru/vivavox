import { View, StyleSheet } from "react-native";
import { useDevice } from "../hooks/useDevice";

import SideBar from "./components/sideBar";
import BottomBar from "./components/bottomBar";

export default function AppLayout({ children }) {
  const { isTablet } = useDevice();

  return (
    <View style={styles.container}>
      {isTablet && <SideBar />}

      <View style={styles.content}>
        {children}
      </View>

      {!isTablet && <BottomBar />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#AFC0CB",
  },

  content: {
    flex: 1,
  },
});