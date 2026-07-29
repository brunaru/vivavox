import React from "react";
import { View, StyleSheet } from "react-native";
import { useDisplaySettings } from "../../contexts/displaySettingsContext";

import FeatureBar from "./FeatureBar";
import Board from "./Board";
import ConfigCellMenu from "../../components/configCell/ConfigCellMenu";
import ConfigBoardMenu from "../../components/configBoard/configBoardMenu";

export default function BoardScreen() {
  const { contrastTheme } = useDisplaySettings();
  return (
      <View style={[styles.container, {backgroundColor: contrastTheme.screenBackground}]}>
        <FeatureBar />
        <View style={styles.boardWrapper}>
          <Board />
        </View>
        <ConfigCellMenu/>
        <ConfigBoardMenu/>
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