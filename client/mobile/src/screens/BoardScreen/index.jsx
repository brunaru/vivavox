import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import FeatureBar from "./FeatureBar";
import Board from "./Board";

export default function BoardScreen() {
  return (
      <View style={styles.container}>
        <FeatureBar />
        <View style={styles.boardWrapper}>
          <Board />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  boardWrapper: {
    flex: 1,
  },
});