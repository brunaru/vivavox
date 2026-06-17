import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import { useBoard } from "../../../contexts/boardContext";
import { useSidebar } from "../../../contexts/sideBarContext"
import { useDevice } from "../../../hooks/useDevice";

import Cell from "../../../components/cell/Cell";
import CellPreview from "../../../components/cell/CellPreview";

const Board = forwardRef((props, ref) => {
  const { board } = useBoard();
  const { isTablet, isLandscape, width } = useDevice();
  const { isSidebarOpen } = useSidebar();

  const cellRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    selectCell(index) {
      cellRefs.current[index]?.handlePress?.();
    },
  }));

  if (!board || !board.dimensions) {
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  let numColumns;
  let horizontalPadding;
  if (isTablet && isLandscape) {
    numColumns = 5;
    horizontalPadding = 17;
  } else if (isTablet && !isLandscape) {
    numColumns = 4;
    horizontalPadding = 20;
  } else {
    numColumns = 2;
    horizontalPadding = 15;
  }

  const gap = 10; 

  const totalGap = gap * (numColumns - 1);
  const availableWidth = width - horizontalPadding;

  const cellSize = ((availableWidth - totalGap) / numColumns) - horizontalPadding;

  return (
    <FlatList
      key={numColumns} 
      style={{ flex: 1 }} 
      data={Array.from({ length: board.numCells })}
      keyExtractor={(_, index) => index.toString()}
      numColumns={numColumns}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.listContent}
      renderItem={({ index }) => {
        const cellData = board.cells?.[index];

        const isLastColumn = (index + 1) % numColumns === 0;

        return (
          <View
            style={{
              width: cellSize,
              height: cellSize,
              marginLeft: isTablet ? 0 : gap,
              marginRight: isTablet && isLastColumn ? 0 : gap,
              marginBottom: gap,
            }}
          >
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
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});