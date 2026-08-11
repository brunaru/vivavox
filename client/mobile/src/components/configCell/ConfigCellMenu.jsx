import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

import { useCell } from "../../contexts/cellContext";
import { useBoard } from "../../contexts/boardContext";
import { useDevice } from "../../hooks/useDevice";
import { useDisplaySettings } from "../../contexts/displaySettingsContext";
import { useS3Upload } from "../../hooks/useS3Upload";
import { scheduleCellDeletion } from "../../utils/pendingCellDeletions";
import api from "../../services/api";

import Button from "../Button";
import ConfigCellSelector from "./ConfigCellSelector";
import ColorPickerField from "./ColorPicker";

function isTempUrl(url) {
  return typeof url === "string" && url.startsWith("file://");
}
function isS3Url(url) {
  return typeof url === "string" && /\.s3[.-][\w-]*\.amazonaws\.com/.test(url);
}

export default function ConfigCellMenu() {
  const { configCell, setConfigCell } = useCell();
  const { board, setBoard, fetchBoardById } = useBoard();
  const { isTablet } = useDevice();
  const { contrastTheme } = useDisplaySettings();
  const { uploadFile, deleteFile } = useS3Upload();

  const [text, setText] = useState(configCell?.text || "");
  const [borderColor, setBorderColor] = useState(configCell?.color || "#0b5c74");
  const [image, setImage] = useState(configCell?.img || "");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setText(configCell?.text || "");
    setBorderColor(configCell?.color || "#0b5c74");
    setImage(configCell?.img || "");
    setSelectedAsset(null);
  }, [configCell]);

  const visible = !!configCell;
  const isNewCell = configCell && configCell.indexOnBoard >= (board?.cells?.length ?? 0);

  function close() {
    setConfigCell(null);
  }

  async function handleConfirm() {
    if (loading || !configCell) return;
    setLoading(true);
    try {
      let finalImageUrl = image?.trim() ? image : configCell?.img || "";

      if (isTempUrl(image) && selectedAsset) {
        finalImageUrl = await uploadFile(selectedAsset);
      }

      if (isNewCell) {
        const finalText = text?.trim() || configCell?.text || "";
        const cellResponse = await api.post("/userCell/post", {
          text: finalText,
          img: finalImageUrl,
          color: borderColor,
        });

        const newCells = [...board.cells, { _id: cellResponse.data.cell._id, cellType: "userCell" }];
        const patchResponse = await api.patch(`/board/patch/${board._id}`, {cells: newCells })
        setBoard(patchResponse.data);
        
      } else {
        const hasChanges =
          text !== configCell.text || borderColor !== configCell.color || finalImageUrl !== configCell.img;

        if (hasChanges) {
          if (isS3Url(configCell.img) && finalImageUrl !== configCell.img) {
            try {
              await deleteFile(configCell.img);
            } catch (err) {
              console.error("Erro ao deletar imagem antiga:", err);
            }
          }

          if (configCell.cellType === "userCell") {
            await api.patch(`/userCell/patch/${configCell._id}`, {
              text,
              color: borderColor,
              img: finalImageUrl,
            });
            await fetchBoardById(board._id);
          } else {
            const cellResponse = await api.post("/userCell/post", {
              originalCellId: configCell._id,
              text,
              color: borderColor,
              img: finalImageUrl,
            });

            const newCells = [...board.cells];
            newCells[configCell.indexOnBoard] = {
              _id: cellResponse.data.cell._id,
              cellType: "userCell",
            };

            const patchResponse = await api.patch(`/board/patch/${board._id}`, { cells: newCells });
            setBoard(patchResponse.data);
          }
        }
      }
      close();
    } catch (err) {
      console.error("Erro ao salvar célula:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove() {
    if (!configCell || isNewCell) {
        close();
        return;
    }
    if (configCell.cellType === "userCell") {
        try {
            const newCells = [...board.cells];
            newCells.splice(configCell.indexOnBoard, 1);
            
            const patchResponse = await api.patch(`/board/patch/${board._id}`, { cells: newCells });
            setBoard(patchResponse.data);

            await scheduleCellDeletion({
            cellId: configCell._id,
            imgUrl: isS3Url(configCell.img) ? configCell.img : null,
            });
        } catch (err) {
            console.error("Erro ao remover célula:", err);
        }
    }
    close();
  }

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.card,
            isTablet ? styles.cardTablet : styles.cardPhone,
            { backgroundColor: contrastTheme.sectionBackground, borderColor: contrastTheme.previewBorder },
          ]}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={[styles.title, { color: contrastTheme.text }]}>
              {isNewCell ? "Nova célula" : "Editar célula"}
            </Text>

            <Text style={[styles.label, { color: contrastTheme.text }]}>Texto</Text>
            <TextInput
              style={[styles.input, { color: contrastTheme.text, borderColor: contrastTheme.previewBorder }]}
              value={text}
              onChangeText={setText}
              placeholder="Insira aqui"
              placeholderTextColor="#999"
            />

            <ColorPickerField label="Cor da borda" color={borderColor} onChange={setBorderColor} />

            <ConfigCellSelector image={image} setImage={setImage} onAssetSelect={setSelectedAsset} />

            {loading && <ActivityIndicator style={{ marginVertical: 10 }} />}

            <View style={styles.actionsRow}>
              {!isNewCell && <Button text="Remover célula" onPress={handleRemove} />}
              <Button text="Cancelar" onPress={close} />
              <Button text={loading ? "Salvando..." : "Confirmar"} onPress={handleConfirm} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
  cardTablet: {
    width: 520,
    maxHeight: "85%",
  },
  cardPhone: {
    width: "92%",
    maxHeight: "90%",
  },
  content: {
    padding: 20,
    gap: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
});
