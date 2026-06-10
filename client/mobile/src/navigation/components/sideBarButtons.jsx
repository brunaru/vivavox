import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useSidebar } from "../../contexts/sideBarContext"

export default function SidebarButtom({ icon: Icon, label, route }) {
  const { isSidebarOpen } = useSidebar();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.item,
        !isSidebarOpen && styles.itemCollapsed
      ]}
      onPress={() => navigation.navigate(route)}
    >
      <Icon width={26} height={26} color="#FFF" />

      {isSidebarOpen && (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 15,
  },

  itemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },

  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});