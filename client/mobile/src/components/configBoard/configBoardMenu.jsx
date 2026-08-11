import React, { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert, ActivityIndicator } from "react-native";

import { useBoard } from "../../contexts/boardContext";
import { useDevice } from "../../hooks/useDevice";
import { useDisplaySettings } from "../../contexts/displaySettingsContext";
import { scheduleCellDeletion } from "../../utils/pendingCellDeletions";
import api from "../../services/api";

import Button from "../Button";
import ConfigCellSelector from "../configCell/ConfigCellSelector";

const DIMENSION_LIMITS = { min: 2, max: 10 };

export default function ConfigBoardMenu() {
  const { board, setBoard, configBoard, setConfigBoard } = useBoard();
  const { isTablet } = useDevice();
  const { contrastTheme } = useDisplaySettings();

  const [name, setName] = useState(board?.name || "");
  const [tagsInput, setTagsInput] = useState((board?.tags || []).join(", "));
  const [rows, setRows] = useState(board?.dimensions?.[0] || 4);
  const [cols, setCols] = useState(board?.dimensions?.[1] || 4);
  const [imgPreview, setImgPreview] = useState(board?.imgPreview || "");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!configBoard || !board) return null;

  function close() {
    setConfigBoard(false);
  }

  function clampDimension(value) {
    return Math.min(Math.max(value, DIMENSION_LIMITS.min), DIMENSION_LIMITS.max);
  }

  async function handleConfirm() {
    if (loading) return;

    const newNumCells = rows * cols;
    const willLoseCells = newNumCells < board.cells.length;

    const proceed = () => saveBoard(newNumCells);

    if (willLoseCells) {
      Alert.alert(
        "Reduzir número de células?",
        `A prancha atual tem ${board.cells.length} células preenchidas, e o novo tamanho comporta apenas ${newNumCells}. As últimas ${board.cells.length - newNumCells} células serão removidas. Deseja continuar?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Continuar", style: "destructive", onPress: proceed },
        ]
      );
      return;
    }

    proceed();
  }

  async function saveBoard(newNumCells) {
    setLoading(true);
    try {
      let finalImgPreview = imgPreview?.trim() ? imgPreview : board.imgPreview || "";

      // todo: upload your own image 

      const parsedTags = tagsInput
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);

      const updatedCells = board.cells.slice(0, newNumCells);
      const removedCells = board.cells.slice(newNumCells);
      
      for (const cell of removedCells) {
        if (cell.cellType === "userCell") {
            await scheduleCellDeletion({
            cellId: cell._id,
            imgUrl: cell.img && /\.s3[.-][\w-]*\.amazonaws\.com/.test(cell.img) ? cell.img : null,
            });
        }
      }

      const patchPayload = {
        name: name.trim() || board.name,
        tags: parsedTags,
        dimensions: [rows, cols],
        numCells: newNumCells,
        imgPreview: finalImgPreview,
        cells: updatedCells,
      };

      const response = await api.patch(`/board/patch/${board._id}`, patchPayload);
      setBoard(response.data);
      close();

    } catch (err) {
      console.error("Erro ao salvar prancha:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={configBoard} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.card,
            isTablet ? styles.cardTablet : styles.cardPhone,
            { backgroundColor: contrastTheme.sectionBackground, borderColor: contrastTheme.previewBorder },
          ]}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={[styles.title, { color: contrastTheme.text }]}>Editar prancha</Text>

            <Text style={[styles.label, { color: contrastTheme.text }]}>Nome da prancha</Text>
            <TextInput
              style={[styles.input, { color: contrastTheme.text, borderColor: contrastTheme.previewBorder }]}
              value={name}
              onChangeText={setName}
              placeholder="Nome da prancha"
              placeholderTextColor="#999"
            />

            <Text style={[styles.label, { color: contrastTheme.text }]}>Categorias (separadas por vírgula)</Text>
            <TextInput
              style={[styles.input, { color: contrastTheme.text, borderColor: contrastTheme.previewBorder }]}
              value={tagsInput}
              onChangeText={setTagsInput}
              placeholder="pessoas, rotina, escola..."
              placeholderTextColor="#999"
            />

            <Text style={[styles.label, { color: contrastTheme.text }]}>Tamanho da grade</Text>
            <View style={styles.dimensionsRow}>
              <DimensionStepper
                label="Linhas"
                value={rows}
                onChange={(v) => setRows(clampDimension(v))}
                theme={contrastTheme}
              />
              <DimensionStepper
                label="Colunas"
                value={cols}
                onChange={(v) => setCols(clampDimension(v))}
                theme={contrastTheme}
              />
            </View>
            <Text style={[styles.hint, { color: contrastTheme.text }]}>
              Total de células: {rows * cols}
            </Text>

            <ConfigCellSelector image={imgPreview} setImage={setImgPreview} onAssetSelect={setSelectedAsset} />

            {loading && <ActivityIndicator style={{ marginVertical: 10 }} />}

            <View style={styles.actionsRow}>
              <Button text="Cancelar" onPress={close} />
              <Button text={loading ? "Salvando..." : "Confirmar"} onPress={handleConfirm} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function DimensionStepper({ label, value, onChange, theme }) {
  return (
    <View style={styles.stepperContainer}>
      <Text style={[styles.stepperLabel, { color: theme.text }]}>{label}</Text>
      <View style={styles.stepper}>
        <Pressable style={styles.stepButton} onPress={() => onChange(value - 1)}>
          <Text style={styles.stepButtonText}>−</Text>
        </Pressable>
        <Text style={[styles.stepValue, { color: theme.text }]}>{value}</Text>
        <Pressable style={styles.stepButton} onPress={() => onChange(value + 1)}>
          <Text style={styles.stepButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 16,
    borderWidth: 2,
    overflow: "hidden",
  },
  cardTablet: { width: 520, maxHeight: "85%" },
  cardPhone: { width: "92%", maxHeight: "90%" },
  content: { padding: 20, gap: 14 },
  title: { fontSize: 18, fontWeight: "800", marginBottom: 4 },
  label: { fontSize: 14, fontWeight: "700" },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  hint: { fontSize: 12, fontStyle: "italic" },
  dimensionsRow: {
    flexDirection: "row",
    gap: 20,
  },
  stepperContainer: { gap: 4 },
  stepperLabel: { fontSize: 13, fontWeight: "600" },
  stepper: { flexDirection: "row", alignItems: "center", gap: 10 },
  stepButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#0b5c74",
    justifyContent: "center",
    alignItems: "center",
  },
  stepButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  stepValue: { fontSize: 14, fontWeight: "700", minWidth: 24, textAlign: "center" },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
});