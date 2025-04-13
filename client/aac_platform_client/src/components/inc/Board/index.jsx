import { useState, useEffect, useRef } from "react";
import { useCell } from "../../contexts/CellContext";
import Cell from "../Cell";
import {
  BoardContainer,
  BoardItem
} from "./styled";
import { useBoard } from "../../contexts/BoardContext";
import api from "../../../services/api";


function Board() {
  const {activeCell, setActiveCell, editing, configCell} = useCell();
  const {board, fetchBoard, setBoard, isLoading, error} = useBoard();
  const [targetIndex, setTargetIndex] = useState(null);
  const [dimensions, setDimensions] = useState([4, 6, 24]);
  const [bounceCells, setBounceCells] = useState( null );
  const [hasBoardChanges, setHasBoardChanges] = useState(false);
  const [boardNameKey, setBoardNameKey] = useState('Padrão 2')

  const baseURL = import.meta.env.VITE_API_BASE_URL

  const prevEditingRef = useRef(editing);

  async function handleFetch() {
    try {
      const response = await api.get(`/board/get/${boardNameKey}`);
      setBoard({
        _id: response.data._id,
        name: response.data.name,
        numCells: response.data.numCells,
        cells: response.data.cells
      })
    } catch(error) {
      console.log(error);
    }
  }

  async function updateBoard() {
    if(!board._id) return;
    try {
      await api.patch(`/board/patch/${board._id}`, board);
      console.log('Cells successfully sent to api');
    } catch(error) {
      console.log('Error sending cells to api:', error);
    }
  }

  const onDrop = (targetPosition) => {
    if(activeCell == null || activeCell === undefined) return;

    // Switch cell positions:
    const newCells = [...board.cells];
    const currentCell = newCells[activeCell];
    const targetCell = newCells[targetPosition];

    newCells[targetPosition] = currentCell;
    newCells[activeCell] = targetCell;

    setBoard({
      _id: board._id,
      name: board.name,
      numCells: board.numCells,
      cells: newCells
    })
    setBounceCells([activeCell, targetPosition]);
    setTimeout(() => {
      setBounceCells([]); 
    }, 300); 
    setTargetIndex(null);
    setHasBoardChanges(true);
  }

  // Fetches board when reload page:
  useEffect(() => {
    if(baseURL) {
      console.log("Reaload de página");
      fetchBoard(boardNameKey);
    } else {
      console.warn("API_BASE_URL not defined. Verify .env");
    }
  }, []);

  // Update board after configCell menu:
  useEffect(() => {
    console.log("Após configCell mudar");
    if(configCell === null) {
      updateBoard();
      fetchBoard(boardNameKey);
    }
  }, [configCell, boardNameKey]);

  useEffect(() => {
    const prevEditing = prevEditingRef.current;
    console.log("Após editing mudar");

    // If 'editing' changes from true to false:
    if(prevEditing && !editing && hasBoardChanges) {
      updateBoard();
      setHasBoardChanges(false);
    }

    prevEditingRef.current = editing;
  }, [editing]);


  if(!board.cells) {
    return (
      <h2>Carregando...</h2>
    );
  }

  return (
    <BoardContainer $dimensions={dimensions}>
      {board.cells.map((cell, index) => {
        return (
          <BoardItem key={index}>
            <Cell 
              index={index}
              cell={cell}
              setTargetIndex={setTargetIndex}
              targetIndex={targetIndex}
              onDrop={() => onDrop(index)}
              bounceCells={bounceCells}
            />
          </BoardItem>
        );
      })}
    </BoardContainer>
  );
}

export default Board;