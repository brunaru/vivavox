import { useState, useEffect, useRef } from "react";
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


function Board() {
  const {activeCell, setActiveCell, editing, configCell} = useCell();
  const {board, setBoard, isLoading, error} = useBoard();
  const [targetIndex, setTargetIndex] = useState(null);
  const [dimensions, setDimensions] = useState([5, 6]);
  const [bounceCells, setBounceCells] = useState( null );
  const [hasBoardChanges, setHasBoardChanges] = useState(false);
  const prevConfigCellRef = useRef(configCell);

  const baseURL = import.meta.env.VITE_API_BASE_URL

  const prevEditingRef = useRef(editing);

  async function updateBoard() {
    if(!board || !board._id) return;
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

  // Update board after configCell menu:
  useEffect(() => {
    // Use a ref to track the previous value
    const prevConfigCell = prevConfigCellRef.current; // (Necessário adicionar este ref, veja abaixo)

    // Only act if configCell changed FROM something TO null
    if (prevConfigCell !== null && configCell === null) {
      console.log("Após sair da configuração da célula => Marcando que houve mudanças");
      // Instead of saving immediately, just mark that changes happened
      setHasBoardChanges(true);
      // The existing useEffect that monitors 'editing' will handle the save
      // when the user exits editing mode.
    }

    // Update the ref for the next render
    prevConfigCellRef.current = configCell;
  }, [configCell]);

  useEffect(() => {
    const prevEditing = prevEditingRef.current;
    console.log("Após sair do modo edição => UpdateBoard");

    // If 'editing' changes from true to false:
    if(prevEditing && !editing && hasBoardChanges) {
      updateBoard();
      setHasBoardChanges(false);
    }

    prevEditingRef.current = editing;
  }, [editing]);


  if(!board || board === undefined) {
    return (
      <h2>Carregando...</h2>
    );
  } 


  return (
    <BoardContainer $dimensions={board.dimensions}>
      {Array.from({ length: board.numCells }).map((_, index) => {
        // Verifica se existe uma célula definida no array 'board.cells' para este índice
        const cellData = board.cells && board.cells[index];

        return (
          <BoardItem key={index}>
            {
              // Se cellData existe e não é null/undefined (ou qualquer valor que signifique 'vazio')
              cellData ?
              <Cell
                index={index}
                cell={cellData} // Passa a célula encontrada
                setTargetIndex={setTargetIndex}
                targetIndex={targetIndex}
                onDrop={() => onDrop(index)}
                bounceCells={bounceCells}
              />
              :
              // Caso contrário, renderiza o placeholder BoardPreview
              <CellPreview/>
            }
          </BoardItem>
        );
      })}
    </BoardContainer>
  );
}

export default Board;