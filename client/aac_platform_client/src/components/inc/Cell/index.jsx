import { useState } from "react";
import CellText from "../CellText";
import Symbol from "../Symbol";
import {
  CellContainer
} from "./styled";
import { useCell } from "../../contexts/CellContext";
import { usePhrase } from "../../contexts/PhraseContext";


function Cell({ index, cell, setTargetIndex, targetIndex, onDrop, bounceCells }) {
  const {editing, setActiveCell, configCell, setConfigCell} = useCell();
  const {addWord} = usePhrase();
  const [isDragging, setIsDragging] = useState(false);

  function handleCellClick() {
    if(editing) {
      if(!configCell) {
        setConfigCell({ ...cell, indexOnBoard: index });
      }
    } else {
      addWord(cell.text);
    }
  }

  function handleContextMenu(e) {
    // Previne o menu de contexto APENAS se estiver editando e for arrastável
    if (editing) {
      e.preventDefault();
    }
  }

  return (
    <CellContainer 
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
      onDrop={() => {
        onDrop();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setTargetIndex(index);
      }}
      color={cell.color}
    >
      <Symbol source={cell.img} />
      <CellText text={cell.text} />
    </CellContainer>
  );
}

export default Cell;