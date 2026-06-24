import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDevice } from "../../hooks/useDevice";

export default function Button({ text, onPress, icon: Icon, round, style }) {
  const { isTablet } = useDevice();

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isTablet && styles.buttonTablet,
        round && styles.buttonRound,
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {Icon && <Icon width={isTablet ? 23 : 18} height={isTablet ? 23 : 18} />}
      {text && <Text style={[styles.text, isTablet && styles.textTablet]}>{text}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D1E3EE", 
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 8, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "#0b5c74", 
  },
  buttonTablet: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonRound: {
    width: 45,
    height: 45,
    borderRadius: 18,
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },
  textTablet: {
    fontSize: 17,
  },
});