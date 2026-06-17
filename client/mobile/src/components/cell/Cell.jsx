import React, { useCallback, useRef } from "react";
import { Pressable, StyleSheet, Animated } from 'react-native';

import CellText from "./CellText";
import Symbol from "../symbol";

import { useCell } from "../../contexts/cellContext";
import { usePhrase } from "../../contexts/phraseContext";
import { useBoard } from "../../contexts/boardContext";
import api from "../../services/api";

export default function Cell({ index, cell, size }) {
  const { editing, setActiveCell, configCell, setConfigCell } = useCell();
  const { addWord } = usePhrase();
  const { board, setBoard, categorizedBoards, boardStack, setBoardStack } = useBoard();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLongPress = useCallback(async () => {
    if (!editing) {
      const cellCategories = cell?.categories;
      const currentBoardTags = board?.tags;

      if (Array.isArray(cellCategories) && Array.isArray(currentBoardTags)) {
        const nextRelevantCategory = cellCategories.find(
          (cellCat) => !currentBoardTags.includes(cellCat)
        );

        if (nextRelevantCategory !== undefined) {
          const boards = categorizedBoards?.[nextRelevantCategory];

          if (boards?.length > 0) {
            const targetBoard = boards[0];

            const response = await api.get(`/board/getById/${targetBoard._id}`);

            setBoardStack([...boardStack, board]);
            setBoard(response.data);
          }
        }
      }
    }
  }, [editing, cell, board, categorizedBoards, boardStack, setBoard, setBoardStack]);

  function handlePress() {
    animatePress();

    if (editing) {
      if (!configCell) {
        setConfigCell({ ...cell, indexOnBoard: index });
      }
    } else {
      addWord(cell.text);
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={600}
      onPressIn={() => setActiveCell(index)}
      onPressOut={() => setActiveCell(null)}
    >
      <Animated.View
        style={[
          styles.container,
          {
            borderColor: cell?.color || "#ccc",
            transform: [{ scale: scaleAnim }],
            width: size,
            height: size,
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