import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import Board from "./Board";

export default function BoardScreen({ route }) {
  return (
    <View style={styles.container}>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFC0CB",
  },
});