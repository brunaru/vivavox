import { useState, useEffect } from "react";
import axios from 'axios';
import Cell from "../Cell";
import {
  BoardContainer,
  BoardItem
} from "./styled";


function Board({ editing }) {
  const [cells, setCells] = useState([]);

  async function handleFetch() {
    try {
      const response = await axios.get('http://localhost:3001/board/get/Padrão');
      setCells(response.data.cells);
      console.log(response.data.cells);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetch();
  }, []);

  const [activeCell, setActiveCell] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [dimensions, setDimensions] = useState([4, 6, 24]);
  const [bounceCells, setBounceCells] = useState( null );

  const onDrop = (targetPosition) => {
    if(activeCell == null || activeCell === undefined) return;

    // Switch cell positions:
    const newCells = [...cells];
    const currentCell = newCells[activeCell];
    const targetCell = newCells[targetPosition];

    newCells[targetPosition] = currentCell;
    newCells[activeCell] = targetCell;

    setCells(newCells);
    setBounceCells([activeCell, targetPosition]);
    setTimeout(() => {
      setBounceCells([]); 
    }, 300); 
    setTargetIndex(null);
  }

  return (
    <BoardContainer $dimensions={dimensions}>
      {cells.map((cell, index) => {
        return (
          <BoardItem>
            <Cell 
              key={index} 
              index={index}
              cell={cell}
              setActiveCell={setActiveCell} 
              setTargetIndex={setTargetIndex}
              targetIndex={targetIndex}
              onDrop={() => onDrop(index)}
              bounceCells={bounceCells}
              editing={editing}
            />
          </BoardItem>
        );
      })}
    </BoardContainer>
  );
}

export default Board;