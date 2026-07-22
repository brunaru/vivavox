import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Draggable, Droppable } from "react-native-reanimated-dnd";
import { usePhrase } from "../../contexts/phraseContext";
import { useDevice } from "../../hooks/useDevice"
import { useDisplaySettings } from "../../contexts/displaySettingsContext";

export default function WriteBar() {
  const { isTablet } = useDevice();
  const { words, setWords } = usePhrase();
  const [isDragging, setIsDragging] = useState(false);
  const { contrastTheme } = useDisplaySettings();

  const handleDropNewWord = (event) => {
    const label = event?.data?.label;
    if (typeof label !== "string") return;
    setWords((prev) => [...prev, label]);
  };

  const handleReorder = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    setWords((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleRemove = (index) => {
    setWords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Droppable droppableId="sentence-bar" onDrop={handleDropNewWord}>
      <View style={[styles.container, {backgroundColor: contrastTheme.writeBar}]}>
        {words.length === 0 ? (
          <Text style={[styles.placeholder, {color: contrastTheme.text}]}>Sua frase aparecerá aqui</Text>
        ) : (
          <View style={styles.wordsContainer}>
            {words.map((word, index) => {
              const uniqueId = `word-${word}-${index}`;

              return (
                <Droppable
                  key={uniqueId}
                  droppableId={`slot-${index}`}
                  onDrop={(data) => {
                    if (typeof data?.fromIndex === "number") {
                      handleReorder(data.fromIndex, index);
                    } else if (typeof data?.label === "string") {
                      setWords((prev) => {
                        const next = [...prev];
                        next.splice(index, 0, data.label);
                        return next;
                      });
                    }
                  }}
                  style={styles.slot}
                  activeStyle={styles.slotActive}
                >
                  <Draggable
                    data={{ label: word, fromIndex: index }}
                    draggableId={`drag-${uniqueId}`}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                  >
                    <View style={[styles.word, {backgroundColor: contrastTheme.cellBackground}]}>
                      <Text style={[isTablet ? styles.textTablet : styles.text, {color: contrastTheme.text}]}>{word}</Text>
                    </View>
                  </Draggable>
                </Droppable>
              );
            })}
          </View>
        )}

        {isDragging && (
          <Droppable
            droppableId="remove-zone"
            onDrop={(data) => {
              if (typeof data?.fromIndex === "number") {
                handleRemove(data.fromIndex);
              }
            }}
            style={styles.removeZone}
            activeStyle={styles.removeZoneActive}
          >
            <Text style={styles.removeZoneText}>🗑️ Soltar aqui para remover</Text>
          </Droppable>
        )}
      </View>
    </Droppable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    justifyContent: "center",
  },

  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  slot: {
    marginRight: 6,
    marginBottom: 6,
  },

  slotActive: {
    backgroundColor: "rgba(0, 122, 255, 0.08)",
    borderRadius: 8,
  },

  word: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },

  text: {
    fontSize: 14,
    color: "#000",
  },
  textTablet: {
    fontSize: 16,
    color: "#000",
  },

  placeholder: {
    color: "#888",
    textAlign: "center",
  },

  removeZone: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },

  removeZoneActive: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
    borderColor: "#ff3b30",
  },

  removeZoneText: {
    color: "#999",
    fontSize: 13,
  },
});