import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import { useSidebar } from "../../contexts/sideBarContext"
import SidebarButtom from "./sideBarButtons"

import { HamburguerIcon, HomeIcon, AboutIcon, PersonIcon, BoardIcon, SettingsIcon } from "../../svg/navigationMenu"; 

export default function SideBar(){
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    const MENU_ITEMS = [
        { icon: HomeIcon, label: 'Biblioteca', route: 'Library' },
        { icon: BoardIcon, label: 'Pranchas', route: 'Board' },
        { icon: AboutIcon, label: 'Sobre', route: 'About' },
        { icon: PersonIcon, label: 'Perfil', route: 'Login' },
        { icon: SettingsIcon, label: 'Configurações', route: 'Settings' },
    ];

    return(
        <LinearGradient
            colors={['#031B45', '#003466', '#026783', '#0388C2']}
            style={[styles.container, !isSidebarOpen && styles.collapsed]}
        >
            <View style={styles.top}>
                <TouchableOpacity onPress={toggleSidebar}>
                    <HamburguerIcon width={28} height={28} />
                </TouchableOpacity>
            </View>
            <View style={styles.menu}>
                {MENU_ITEMS.map((item) => (
                    <SidebarButtom key={item.route} {...item} />
                ))}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: '100%',
    borderBottomRightRadius: 30,
  },

  collapsed: {
    width: 80,
    alignItems: 'center',
    paddingHorizontal: 0,
  },

  top: {
    marginTop: 80,
    paddingHorizontal: 20,
  },

  menu: {
    flex: 1,
    justifyContent: 'center',
    gap: 60,
  },
});