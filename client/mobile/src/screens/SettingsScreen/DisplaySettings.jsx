import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { useDisplaySettings } from "../../contexts/displaySettingsContext";
import { useDevice } from "../../hooks/useDevice";
import SettingsHeader from "./SettingsHeader";

function StepperRow({ label, value, unit, onIncrement, onDecrement, disabledMin, disabledMax }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.stepper}>
        <Pressable
          onPress={onDecrement}
          disabled={disabledMin}
          style={[styles.stepButton, disabledMin && styles.stepButtonDisabled]}
        >
          <Text style={styles.stepButtonText}>−</Text>
        </Pressable>
        <Text style={styles.stepValue}>{value}{unit || ""}</Text>
        <Pressable
          onPress={onIncrement}
          disabled={disabledMax}
          style={[styles.stepButton, disabledMax && styles.stepButtonDisabled]}
        >
          <Text style={styles.stepButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ContrastOption({ mode, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={[styles.contrastOption, selected && styles.contrastOptionSelected]}
    >
      <View
        style={[
          styles.swatch,
          { backgroundColor: mode.swatch.bg, borderColor: mode.swatch.fg },
        ]}
      >
        <Text style={[styles.swatchLetter, { color: mode.swatch.fg }]}>Aa</Text>
      </View>
      <View style={styles.contrastTextWrap}>
        <Text style={styles.contrastLabel}>{mode.label}</Text>
        <Text style={styles.contrastDescription}>{mode.description}</Text>
      </View>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </Pressable>
  );
}

export default function DisplaySettings({ navigation }) {
  const {
    contrast,
    fontScale,
    borderWidth,
    imageScale,
    columns,
    limits,
    contrastModes,
    setContrast,
    setFontScale,
    setBorderWidth,
    setImageScale,
    setColumnsForDevice,
    resetSettings,
  } = useDisplaySettings();

  const { isTablet } = useDevice();
  const BASE_FONT_SIZE = 14;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SettingsHeader
        title="Visualização"
        subtitle="Ajuste o app ao seu jeito de ver"
        onBack={() => navigation.goBack()}
        isTablet={isTablet}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contraste</Text>
        {Object.values(contrastModes).map((mode) => (
          <ContrastOption
            key={mode.id}
            mode={mode}
            selected={contrast === mode.id}
            onPress={() => setContrast(mode.id)}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visualização das Células</Text>
        <StepperRow
          label="Tamanho do texto"
          value={Math.round(fontScale * BASE_FONT_SIZE)}
          unit="pt"
          onIncrement={() => setFontScale(fontScale + limits.font.step)}
          onDecrement={() => setFontScale(fontScale - limits.font.step)}
          disabledMin={fontScale <= limits.font.min}
          disabledMax={fontScale >= limits.font.max}
        />
        <StepperRow
          label="Espessura da borda"
          value={borderWidth}
          unit="px"
          onIncrement={() => setBorderWidth(borderWidth + limits.border.step)}
          onDecrement={() => setBorderWidth(borderWidth - limits.border.step)}
          disabledMin={borderWidth <= limits.border.min}
          disabledMax={borderWidth >= limits.border.max}
        />
        <StepperRow
          label="Tamanho da imagem"
          value={Math.round(imageScale * 100)}
          unit="%"
          onIncrement={() => setImageScale(imageScale + limits.image.step)}
          onDecrement={() => setImageScale(imageScale - limits.image.step)}
          disabledMin={imageScale <= limits.image.min}
          disabledMax={imageScale >= limits.image.max}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Células por linha</Text>

        <StepperRow
          label="Celular"
          value={columns.phone}
          onIncrement={() => setColumnsForDevice("phone", columns.phone + 1)}
          onDecrement={() => setColumnsForDevice("phone", columns.phone - 1)}
          disabledMin={columns.phone <= limits.columns.phone.min}
          disabledMax={columns.phone >= limits.columns.phone.max}
        />
        <StepperRow
          label="Tablet na vertical"
          value={columns.tabletPortrait}
          onIncrement={() => setColumnsForDevice("tabletPortrait", columns.tabletPortrait + 1)}
          onDecrement={() => setColumnsForDevice("tabletPortrait", columns.tabletPortrait - 1)}
          disabledMin={columns.tabletPortrait <= limits.columns.tabletPortrait.min}
          disabledMax={columns.tabletPortrait >= limits.columns.tabletPortrait.max}
        />
        <StepperRow
          label="Tablet na horizontal"
          value={columns.tabletLandscape}
          onIncrement={() => setColumnsForDevice("tabletLandscape", columns.tabletLandscape + 1)}
          onDecrement={() => setColumnsForDevice("tabletLandscape", columns.tabletLandscape - 1)}
          disabledMin={columns.tabletLandscape <= limits.columns.tabletLandscape.min}
          disabledMax={columns.tabletLandscape >= limits.columns.tabletLandscape.max}
        />
      </View>

      <Pressable style={styles.resetButton} onPress={resetSettings}>
        <Text style={styles.resetButtonText}>Restaurar padrão</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#AFC0CB" 
    },
    content: { 
        paddingBottom: 40 
    },
    section: {
        backgroundColor: "#ebf1f8",
        borderColor: "#0b5c74",
        borderWidth: 2,
        borderRadius: 14,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 14,
    },
    sectionTitle: { 
        fontSize: 16, 
        fontWeight: "700", 
        color: "#1C1C1E", 
        marginBottom: 8 
    },
    row: { 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        paddingVertical: 8 
    },
    rowLabel: { 
        fontSize: 14, 
        color: "#1C1C1E", 
        fontWeight: "600" 
    },
    stepper: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 10 
    },
    stepButton: {
        width: 32, 
        height: 32, 
        borderRadius: 8, 
        backgroundColor: "#0b5c74",
        justifyContent: "center", 
        alignItems: "center",
    },
    stepButtonDisabled: { 
        backgroundColor: "#9fb4bb" 
    },
    stepButtonText: { 
        color: "#fff", 
        fontSize: 18, 
        fontWeight: "700" 
    },
    stepValue: { 
        fontSize: 14, 
        fontWeight: "700", 
        color: "#15579e", 
        minWidth: 46, 
        textAlign: "center" 
    },
    hint: { 
        fontSize: 12, 
        color: "#15579e", 
        marginTop: 8 
    },
    resetButton: {
        marginTop: 20, 
        marginHorizontal: 16, 
        backgroundColor: "#be554f",
        borderColor: "#85150f", 
        borderWidth: 1.5, 
        borderRadius: 10,
        paddingVertical: 12, 
        alignItems: "center",
    },
    resetButtonText: { 
        color: "#fff", 
        fontWeight: "700", 
        fontSize: 15 
    },

    contrastOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderRadius: 10,
        marginBottom: 6,
    },
    contrastOptionSelected: {
        backgroundColor: "#dbe9f3",
    },
    swatch: {
        width: 44,
        height: 44,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    swatchLetter: { 
        fontSize: 15, 
        fontWeight: "800" 
    },
    contrastTextWrap: { 
        flex: 1 
    },
    contrastLabel: { 
        fontSize: 14, 
        fontWeight: "700", 
        color: "#1C1C1E" 
    },
    contrastDescription: { 
        fontSize: 12, 
        color: "#3a3a3a", 
        marginTop: 2 
    },
    radioOuter: {
        width: 22, 
        height: 22, 
        borderRadius: 11, 
        borderWidth: 2, 
        borderColor: "#0b5c74",
        justifyContent: "center", 
        alignItems: "center", 
        marginLeft: 8,
    },
    radioOuterSelected: { 
        borderColor: "#15579e" 
    },
    radioInner: { 
        width: 12, 
        height: 12, 
        borderRadius: 6, 
        backgroundColor: "#15579e" 
    },
});