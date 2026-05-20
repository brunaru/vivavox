// client/aac_platform_client/src/components/inc/Board/index.jsx
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useCell } from "../../contexts/CellContext";
import Cell from "../Cell";
import BoardPreview from '../PageLibrary/BoardPreview';
import {
  BoardContainer,
  BoardItem
} from "./styled";
import { useBoard } from "../../contexts/BoardContext";
import api from "../../../services/api";
import CellPreview from "../CellPreview";
import { useScan } from "../../contexts/ScanContext";


const Board = forwardRef((props, ref) => {
  const { activeCell, setActiveCell, editing, configCell } = useCell();
  const { board, setBoard, configBoard, fetchCategorizedBoards, boardStack } = useBoard();
  const [targetIndex, setTargetIndex] = useState(null);
  const [dimensions, setDimensions] = useState(board ? [board.dimensions[0], board.dimensions[1]] : [4, 6]);
  const [bounceCells, setBounceCells] = useState(null);
  const [hasBoardChanges, setHasBoardChanges] = useState(false);
  const prevConfigCellRef = useRef(configCell);
  const prevConfigBoardRef = useRef(configBoard);
  const { scanMode, activeRow, activeCol } = useScan();
  const cellRefs = useRef([]);

  const baseURL = import.meta.env.VITE_API_BASE_URL

  const prevEditingRef = useRef(editing);

  useImperativeHandle(ref, () => ({
    selectCell(row, col) {
      if (!dimensions) return;
      const index = row * dimensions[1] + col;
      if (cellRefs.current[index]) {
        cellRefs.current[index].click();
      }
    },
  }));

  async function updateImgPreview() {
    if (!board || !board._id || !board.cells || board.cells.length === 0) return;
    try {
      const cell0Id = board.cells[0]._id;
      if (!cell0Id) return;
      const response = await api.get(`/cell/get/${cell0Id}`);
      const cell0Complete = response.data;
      const cell0Img = cell0Complete.img;
      const newBoard = { ...board, imgPreview: cell0Img };
      setBoard(newBoard);

      return { ...board, imgPreview: cell0Img };
    } catch (error) {
      console.log('Error updating image preview:', error);
    }
  }

  async function updateBoard(boardToSave) {
    if (!boardToSave || !boardToSave._id) return;
    try {
      await api.patch(`/board/patch/${board._id}`, boardToSave);
      console.log('Cells successfully sent to api');
    } catch (error) {
      console.log('Error sending cells to api:', error);
    }
  }

  const onDrop = (targetPosition) => {
    if (activeCell == null || activeCell === undefined) return;

    const newCells = [...board.cells];
    const currentCell = newCells[activeCell];
    const targetCell = newCells[targetPosition];

    newCells[targetPosition] = currentCell;
    newCells[activeCell] = targetCell;

    setBoard({
      ...board,
      cells: newCells,
    })
    setBounceCells([activeCell, targetPosition]);
    setTimeout(() => {
      setBounceCells([]);
    }, 300);
    setTargetIndex(null);
    setHasBoardChanges(true);
  }

  useEffect(() => {
    const prevConfigCell = prevConfigCellRef.current;
    if (prevConfigCell !== null && configCell === null) {
      setHasBoardChanges(true);
    }
    prevConfigCellRef.current = configCell;
  }, [configCell]);

  useEffect(() => {
    const prevConfigBoard = prevConfigBoardRef.current;
    if (prevConfigBoard !== false && configBoard === false) {
      setHasBoardChanges(true);
    }
    prevConfigBoardRef.current = configBoard;
  }, [configBoard]);

  useEffect(() => {
    const prevEditing = prevEditingRef.current;
    async function handleSave() {
      if (prevEditing && !editing && hasBoardChanges) {
        const updatedBoard = await updateImgPreview();
        if (updatedBoard) {
          await updateBoard(updatedBoard);
        } else {
          await updateBoard(board);
        }
        setHasBoardChanges(false);
      }
    }
    handleSave();
    prevEditingRef.current = editing;
  }, [editing, hasBoardChanges, board]);

  useEffect(() => {
    if (board && board.dimensions) {
      setDimensions(board.dimensions);
    }
  }, [board]);

  useEffect(() => {
    fetchCategorizedBoards();
  }, [fetchCategorizedBoards])

  if (!board || !dimensions) {
    return (
      <h2>Carregando...</h2>
    );
  }

  return (
    <BoardContainer $dimensions={dimensions}>
      {Array.from({ length: board.numCells }).map((_, index) => {
        const cellData = board.cells && board.cells[index];
        const rowIndex = Math.floor(index / dimensions[1]);
        const colIndex = index % dimensions[1];

        return (
          <BoardItem key={index}>
            {
              cellData ?
                <Cell
                  ref={el => (cellRefs.current[index] = el)}
                  index={index}
                  cell={cellData}
                  setTargetIndex={setTargetIndex}
                  targetIndex={targetIndex}
                  onDrop={() => onDrop(index)}
                  bounceCells={bounceCells}
                  isRowActive={scanMode === 'row' && rowIndex === activeRow}
                  isCellActive={scanMode === 'col' && rowIndex === activeRow && colIndex === activeCol}
                />
                :
                <CellPreview index={index} />
            }
          </BoardItem>
        );
      })}
    </BoardContainer>
  );
});

export default Board;

