import { View, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

import { HomeIcon, AboutIcon, PersonIcon, BoardIcon, SettingsIcon } from "../../svg/navigationMenu"; 

export default function BottomBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const MENU_ITEMS = [
    { icon: HomeIcon, route: "Library" },
    { icon: BoardIcon, route: "Boards" },
    { icon: PersonIcon, route: "Login" },
    { icon: SettingsIcon, route: "SignUp" },
    { icon: AboutIcon, route: "About" },
  ];

  return (
    <LinearGradient
      colors={["#031B45", "#003466", "#026783", "#0388C2"]}
      style={styles.container}
    >
      {MENU_ITEMS.map((item, index) => {
        const isActive = route.name === item.route;
        const Icon = item.icon;

        return (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => navigation.navigate(item.route)}
          >
            <Icon
              width={26}
              height={26}
              color={isActive ? "#FFFFFF" : "#AFC0CB"}
            />
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,

    height: 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    borderRadius: 25,
    paddingBottom: 10,
  },

  item: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});