import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import { useCell } from "../../contexts/CellContext";
import { useBoard } from "../../contexts/BoardContext";
import { useDevice } from "../../hooks/useDevice";

import Cell from "../Cell";
import CellPreview from "../CellPreview";

const Board = forwardRef((props, ref) => {
  const { board, fetchCategorizedBoards } = useBoard();
  const { isTablet, width } = useDevice();

  const cellRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    selectCell(index) {
      cellRefs.current[index]?.handlePress?.();
    },
  }));

  useEffect(() => {
    fetchCategorizedBoards();
  }, []);

  if (!board || !board.dimensions) {
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const numColumns = isTablet ? board.dimensions[1] : 2;

  const horizontalPadding = 20;
  const gap = 10;

  const cellSize =
    (width - horizontalPadding - gap * (numColumns - 1)) / numColumns;

  return (
    <FlatList
      data={Array.from({ length: board.numCells })}
      keyExtractor={(_, index) => index.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      columnWrapperStyle={{ gap }}
      renderItem={({ index }) => {
        const cellData = board.cells?.[index];

        return (
          <View style={{ width: cellSize, height: cellSize }}>
            {cellData ? (
              <Cell
                ref={(el) => (cellRefs.current[index] = el)}
                index={index}
                cell={cellData}
                size={cellSize} 
              />
            ) : (
              <CellPreview index={index} size={cellSize} />
            )}
          </View>
        );
      }}
    />
  );
});

export default Board;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});