import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import ColorPicker, { Panel1, HueSlider, Preview } from "reanimated-color-picker";
import { useDisplaySettings } from "../../contexts/displaySettingsContext";

export default function ColorPickerField({ label, color, onChange }) {
  const [open, setOpen] = useState(false);
  const { contrastTheme } = useDisplaySettings();
  
  function handleComplete ({ hex }) {
    onChange(hex);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: contrastTheme.text }]}>{label}</Text>

      <Pressable
        style={[styles.swatch, { backgroundColor: color, borderColor: contrastTheme.previewBorder }]}
        onPress={() => setOpen(true)}
      />

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.overlay}>
          <View style={[styles.pickerCard, { backgroundColor: contrastTheme.sectionBackground }]}>
            <ColorPicker value={color} onCompleteJS={handleComplete}>
              <Preview />
              <Panel1 style={{ marginVertical: 12 }} />
              <HueSlider />
            </ColorPicker>

            <Pressable style={styles.doneButton} onPress={() => setOpen(false)}>
              <Text style={styles.doneText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontWeight: "700" },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerCard: {
    width: 300,
    padding: 20,
    borderRadius: 16,
  },
  doneButton: {
    marginTop: 16,
    backgroundColor: "#0b5c74",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  doneText: { color: "#fff", fontWeight: "700" },
});