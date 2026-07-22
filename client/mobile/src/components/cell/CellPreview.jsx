import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useCell } from "../../contexts/cellContext";
import { useDisplaySettings } from "../../contexts/displaySettingsContext";
import Symbol from "../symbol";

export default function CellPreview({ index, size }) {
  const { editing, configCell, setConfigCell } = useCell();
  const { borderWidth, imageScale, contrastTheme } = useDisplaySettings();

  function openConfigMenu() {
    if (editing && !configCell) {
      setConfigCell({ indexOnBoard: index, cellType: "cell" });
    }
  }

  return (
    <Pressable onPress={openConfigMenu}>
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderColor: contrastTheme.previewBorder,
            backgroundColor: contrastTheme.cellBackground,
          },
          editing && [styles.editing, { borderWidth }],
        ]}
      >
        {editing && (
          <Symbol
            source="https://static.arasaac.org/pictograms/3220/3220_300.png"
            size={Math.min(size * 0.5 * imageScale, size - 20)}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  editing: {
    borderStyle: "dashed",
  },
});