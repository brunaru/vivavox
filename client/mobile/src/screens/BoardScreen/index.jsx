import React from "react";
import { View, StyleSheet } from "react-native";
import { useDisplaySettings } from "../../contexts/displaySettingsContext";

import FeatureBar from "./FeatureBar";
import Board from "./Board";

export default function BoardScreen() {
  const { contrastTheme } = useDisplaySettings();
  return (
      <View style={[styles.container, {backgroundColor: contrastTheme.screenBackground}]}>
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