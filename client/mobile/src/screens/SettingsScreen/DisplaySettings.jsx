// DisplaySettings.js
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { useDisplaySettings } from "../../contexts/displaySettingsContext";
import { useDevice } from "../../hooks/useDevice";
import SettingsHeader from "./SettingsHeader";

function StepperRow({ label, value, unit, onIncrement, onDecrement, disabledMin, disabledMax, contrastTheme }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: contrastTheme.text, fontWeight: contrastTheme.textBold ? '800' : '600' }]}>
        {label}
      </Text>
      <View style={styles.stepper}>
        <Pressable
          onPress={onDecrement}
          disabled={disabledMin}
          style={[
            styles.stepButton,
            { backgroundColor: contrastTheme.buttonBackground, borderColor: contrastTheme.buttonBorderColor, borderWidth: 1.5 },
            disabledMin && styles.stepButtonDisabled,
          ]}
        >
          <Text style={[styles.stepButtonText, { color: contrastTheme.iconStroke }]}>−</Text>
        </Pressable>
        <Text style={[styles.stepValue, { color: contrastTheme.text, fontWeight: contrastTheme.textBold ? '800' : '700' }]}>
          {value}{unit || ""}
        </Text>
        <Pressable
          onPress={onIncrement}
          disabled={disabledMax}
          style={[
            styles.stepButton,
            { backgroundColor: contrastTheme.buttonBackground, borderColor: contrastTheme.buttonBorderColor, borderWidth: 1.5 },
            disabledMax && styles.stepButtonDisabled,
          ]}
        >
          <Text style={[styles.stepButtonText, { color: contrastTheme.iconStroke }]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ContrastOption({ mode, selected, onPress, contrastTheme }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={[
        styles.contrastOption,
        selected && { backgroundColor: contrastTheme.buttonBackground },
      ]}
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
        <Text style={[styles.contrastLabel, { color: contrastTheme.text, fontWeight: contrastTheme.textBold ? '800' : '700' }]}>
          {mode.label}
        </Text>
        <Text style={[styles.contrastDescription, { color: contrastTheme.text, opacity: 0.75 }]}>
          {mode.description}
        </Text>
      </View>
      <View style={[styles.radioOuter, { borderColor: contrastTheme.buttonBorderColor }]}>
        {selected && <View style={[styles.radioInner, { backgroundColor: contrastTheme.buttonBorderColor }]} />}
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
    contrastTheme,
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
    <ScrollView
      style={[styles.container, { backgroundColor: contrastTheme.screenBackground }]}
      contentContainerStyle={styles.content}
    >
      <SettingsHeader
        title="Visualização"
        subtitle="Ajuste o app ao seu jeito de ver"
        onBack={() => navigation.goBack()}
        isTablet={isTablet}
      />

      <View style={[
        styles.section,
        { backgroundColor: contrastTheme.sectionBackground, borderColor: contrastTheme.cellBorder || contrastTheme.cellBorderFallback }
      ]}>
        <Text style={[styles.sectionTitle, { color: contrastTheme.text, fontWeight: contrastTheme.textBold ? '800' : '700' }]}>
          Contraste
        </Text>
        {Object.values(contrastModes).map((mode) => (
          <ContrastOption
            key={mode.id}
            mode={mode}
            selected={contrast === mode.id}
            onPress={() => setContrast(mode.id)}
            contrastTheme={contrastTheme}
          />
        ))}
      </View>

      <View style={[
        styles.section,
        { backgroundColor: contrastTheme.sectionBackground, borderColor: contrastTheme.cellBorder || contrastTheme.cellBorderFallback }
      ]}>
        <Text style={[styles.sectionTitle, { color: contrastTheme.text, fontWeight: contrastTheme.textBold ? '800' : '700' }]}>
          Visualização das Células
        </Text>
        <StepperRow
          label="Tamanho do texto"
          value={Math.round(fontScale * BASE_FONT_SIZE)}
          unit="pt"
          onIncrement={() => setFontScale(fontScale + limits.font.step)}
          onDecrement={() => setFontScale(fontScale - limits.font.step)}
          disabledMin={fontScale <= limits.font.min}
          disabledMax={fontScale >= limits.font.max}
          contrastTheme={contrastTheme}
        />
        <StepperRow
          label="Espessura da borda"
          value={borderWidth}
          unit="px"
          onIncrement={() => setBorderWidth(borderWidth + limits.border.step)}
          onDecrement={() => setBorderWidth(borderWidth - limits.border.step)}
          disabledMin={borderWidth <= limits.border.min}
          disabledMax={borderWidth >= limits.border.max}
          contrastTheme={contrastTheme}
        />
        <StepperRow
          label="Tamanho da imagem"
          value={Math.round(imageScale * 100)}
          unit="%"
          onIncrement={() => setImageScale(imageScale + limits.image.step)}
          onDecrement={() => setImageScale(imageScale - limits.image.step)}
          disabledMin={imageScale <= limits.image.min}
          disabledMax={imageScale >= limits.image.max}
          contrastTheme={contrastTheme}
        />
      </View>

      <View style={[
        styles.section,
        { backgroundColor: contrastTheme.sectionBackground, borderColor: contrastTheme.cellBorder || contrastTheme.cellBorderFallback }
      ]}>
        <Text style={[styles.sectionTitle, { color: contrastTheme.text, fontWeight: contrastTheme.textBold ? '800' : '700' }]}>
          Células por linha
        </Text>

        <StepperRow
          label="Celular"
          value={columns.phone}
          onIncrement={() => setColumnsForDevice("phone", columns.phone + 1)}
          onDecrement={() => setColumnsForDevice("phone", columns.phone - 1)}
          disabledMin={columns.phone <= limits.columns.phone.min}
          disabledMax={columns.phone >= limits.columns.phone.max}
          contrastTheme={contrastTheme}
        />
        <StepperRow
          label="Tablet na vertical"
          value={columns.tabletPortrait}
          onIncrement={() => setColumnsForDevice("tabletPortrait", columns.tabletPortrait + 1)}
          onDecrement={() => setColumnsForDevice("tabletPortrait", columns.tabletPortrait - 1)}
          disabledMin={columns.tabletPortrait <= limits.columns.tabletPortrait.min}
          disabledMax={columns.tabletPortrait >= limits.columns.tabletPortrait.max}
          contrastTheme={contrastTheme}
        />
        <StepperRow
          label="Tablet na horizontal"
          value={columns.tabletLandscape}
          onIncrement={() => setColumnsForDevice("tabletLandscape", columns.tabletLandscape + 1)}
          onDecrement={() => setColumnsForDevice("tabletLandscape", columns.tabletLandscape - 1)}
          disabledMin={columns.tabletLandscape <= limits.columns.tabletLandscape.min}
          disabledMax={columns.tabletLandscape >= limits.columns.tabletLandscape.max}
          contrastTheme={contrastTheme}
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
    },
    content: { 
        paddingBottom: 40 
    },
    section: {
        borderWidth: 2,
        borderRadius: 14,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 14,
    },
    sectionTitle: { 
        fontSize: 16, 
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
        justifyContent: "center", 
        alignItems: "center",
    },
    stepButtonDisabled: { 
        opacity: 0.5,
    },
    stepButtonText: { 
        fontSize: 18, 
        fontWeight: "700" 
    },
    stepValue: { 
        fontSize: 14, 
        minWidth: 46, 
        textAlign: "center" 
    },
    hint: { 
        fontSize: 12, 
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
    },
    contrastDescription: { 
        fontSize: 12, 
        marginTop: 2 
    },
    radioOuter: {
        width: 22, 
        height: 22, 
        borderRadius: 11, 
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center", 
        marginLeft: 8,
    },
    radioInner: { 
        width: 12, 
        height: 12, 
        borderRadius: 6, 
    },
});