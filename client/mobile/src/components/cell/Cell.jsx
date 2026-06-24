import React, { useCallback, useRef } from "react";
import { Pressable, StyleSheet, Animated } from "react-native";

import CellText from "./CellText";
import Symbol from "../symbol";

import { useCell } from "../../contexts/cellContext";
import { usePhrase } from "../../contexts/phraseContext";
import { useBoard } from "../../contexts/boardContext";
import api from "../../services/api";

export default function Cell({ index, cell, size }) {
  const { editing, setActiveCell, configCell, setConfigCell } = useCell();
  const { addWord } = usePhrase();
  const { board, setBoard, categorizedBoards, setBoardStack } = useBoard();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.94,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = useCallback(() => {
    animatePress();

    if (editing) {
      if (!configCell) {
        setConfigCell({ ...cell, indexOnBoard: index });
      }
      return;
    }

    addWord(cell.text);
  }, [editing, configCell, cell, index]);

  const handleLongPress = useCallback(async () => {
    if (editing) return;

    const cellCategories = cell?.categories;
    const currentBoardTags = board?.tags;

    if (!Array.isArray(cellCategories) || !Array.isArray(currentBoardTags)) return;

    const nextCategory = cellCategories.find(
      (cat) => !currentBoardTags.includes(cat)
    );

    if (!nextCategory) return;

    const boards = categorizedBoards?.[nextCategory];
    if (!boards?.length) return;

    const targetBoard = boards[0];
    if (!targetBoard?._id) return;

    try {
      const response = await api.get(`/board/getById/${targetBoard._id}`);

      if (board) {
        setBoardStack((prev) => [...prev, board]);
      }

      setBoard(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [editing, cell, board, categorizedBoards]);

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={550}
      onPressIn={() => setActiveCell(index)}
      onPressOut={() => setActiveCell(null)}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            borderColor: cell?.color || "#ccc",
            width: size,
            height: size,
            transform: [{ scale: scaleAnim }],
          },
          editing && styles.editing,
        ]}
      >
        <Symbol source={cell?.img} />
        <CellText text={cell?.text} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  editing: {
    borderStyle: "dashed",
    borderWidth: 3,
  },
});