import { useState } from "react";
import CellText from "../CellText";
import Symbol from "../Symbol";
import {
  CellContainer
} from "./styled";
import { useCell } from "../../contexts/CellContext";


function Cell({ index, cell, setTargetIndex, targetIndex, onDrop, bounceCells }) {
  const {editing, setActiveCell, configCell, setConfigCell} = useCell();
  const [isDragging, setIsDragging] = useState(false);
  const [color, setColor] = useState("gray");

  function handleCellClick() {
    console.log(editing, configCell)
    if(!configCell && editing) {
      setConfigCell(cell);
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