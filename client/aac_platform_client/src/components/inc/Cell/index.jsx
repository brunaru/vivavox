// client/aac_platform_client/src/components/inc/Cell/index.jsx
import React, { useCallback, useState, forwardRef } from "react";
import CellText from "../CellText";
import Symbol from "../Symbol";
import { CellContainer } from "./styled";
import { useCell } from "../../contexts/CellContext";
import { usePhrase } from "../../contexts/PhraseContext";
import useLongPress from "../../hooks/useLongPress";
import { useBoard } from "../../contexts/BoardContext";
import api from "../../../services/api";

const Cell = forwardRef(({ index, cell, setTargetIndex, targetIndex, onDrop, bounceCells, isRowActive, isCellActive }, ref) => {
  const { editing, setActiveCell, configCell, setConfigCell } = useCell();
  const { addWord } = usePhrase();
  const { board, setBoard, categorizedBoards, boardStack, setBoardStack } = useBoard();
  const [isDragging, setIsDragging] = useState(false);

  const handleLongPress = useCallback(async () => {
    if (!editing) {
      const cellCategories = cell?.categories;
      const currentBoardTags = board?.tags;

      if (Array.isArray(cellCategories) && Array.isArray(currentBoardTags)) {
        const nextRelevantCategory = cellCategories.find(
          cellCat => !currentBoardTags.includes(cellCat)
        );

        if (nextRelevantCategory !== undefined) {
          if (categorizedBoards && categorizedBoards[nextRelevantCategory] && categorizedBoards[nextRelevantCategory].length > 0) {
            const targetBoard = categorizedBoards[nextRelevantCategory][0];
            const response = await api.get(`/board/getById/${targetBoard._id}`);
            let newBoardStack = [...boardStack, board]; 
            setBoardStack(newBoardStack);
            const populatedBoard = response.data;
            setBoard(populatedBoard);
          }
        }
      }
    }
  }, [editing, cell, board, categorizedBoards, boardStack, setBoard, setBoardStack]);

  const longPressHandlers = useLongPress(handleLongPress, { delay: 1000 });

  function handleCellClick() {
    if (editing) {
      if (!configCell) {
        setConfigCell({ ...cell, indexOnBoard: index });
      }
    } else {
      addWord(cell.text);
    }
  }

  function handleContextMenu(e) {
    e.preventDefault();
  }

  return (
    <CellContainer
      ref={ref} 
      {...(!editing ? longPressHandlers : {})}
      draggable={editing}
      $editing={editing}
      $isDragging={isDragging}
      $isTarget={targetIndex === index}
      $isBouncing={bounceCells !== null && bounceCells.includes(index)}
      onClick={handleCellClick}
      onContextMenu={handleContextMenu}
      onDragStart={(e) => {
        e.stopPropagation();
        setActiveCell(index);
        setIsDragging(true);
      }}
      onDragEnd={() => {
        setActiveCell(null);
        setIsDragging(false);
        setTargetIndex(null);
      }}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setTargetIndex(index);
      }}
      color={cell.color}
      $isRowActive={isRowActive}
      $isCellActive={isCellActive}
    >
      <Symbol source={cell.img} />
      <CellText text={cell.text} />
    </CellContainer>
  );
});

export default Cell;

