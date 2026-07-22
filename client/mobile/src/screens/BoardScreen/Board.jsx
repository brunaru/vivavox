import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import { useBoard } from "../../contexts/boardContext";
import { useSidebar } from "../../contexts/sideBarContext";
import { useDevice } from "../../hooks/useDevice";
import { useDisplaySettings, getDeviceColumnType } from "../../contexts/displaySettingsContext";

import Cell from "../../components/cell/Cell";
import CellPreview from "../../components/cell/CellPreview";

const MIN_CELL_SIZE = 64;
const SIDEBAR_WIDTH_OPEN = 220;
const SIDEBAR_WIDTH_COLLAPSED = 80;

const Board = forwardRef((props, ref) => {
  const { board } = useBoard();
  const { isTablet, isLandscape, width } = useDevice();
  const { isSidebarOpen } = useSidebar();
  const { columns, isLoaded, contrastTheme } = useDisplaySettings();

  const cellRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    selectCell(index) {
      cellRefs.current[index]?.handlePress?.();
    },
  }));

  if (!board || !board.dimensions || !isLoaded) {
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const deviceType = getDeviceColumnType(isTablet, isLandscape);

  let horizontalPadding;
  if (isTablet && isLandscape) {
    horizontalPadding = 17;
  } else if (isTablet && !isLandscape) {
    horizontalPadding = 20;
  } else {
    horizontalPadding = 15;
  }

  const gap = 10;
  let numColumns = columns[deviceType];

  const sidebarWidth = isSidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_COLLAPSED;
  const availableWidth = width - sidebarWidth - horizontalPadding * 2;

  let cellSize;
  do {
    const totalGap = gap * (numColumns - 1);
    cellSize = Math.floor((availableWidth - totalGap) / numColumns);
    if (cellSize < MIN_CELL_SIZE && numColumns > 1) {
      numColumns -= 1;
    } else {
      break;
    }
  } while (numColumns > 1);

  return (
    <FlatList
      key={`${numColumns}-${deviceType}-${isSidebarOpen}`}
      style={{ flex: 1, backgroundColor: contrastTheme.screenBackground }}
      data={Array.from({ length: board.numCells })}
      keyExtractor={(_, index) => index.toString()}
      numColumns={numColumns}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={[styles.listContent, { paddingHorizontal: horizontalPadding }]}
      renderItem={({ index }) => {
        const cellData = board.cells?.[index];
        const isLastColumn = (index + 1) % numColumns === 0;

        return (
          <View
            style={{
              width: cellSize,
              height: cellSize,
              marginRight: isLastColumn ? 0 : gap,
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});