import { useEffect, useState } from "react";
import CellText from "../CellText";
import Symbol from "../Symbol";
import {
  CellContainer
} from "./styled";


function Cell({ index, cell, setActiveCell, setTargetIndex, targetIndex, onDrop, bounceCells }) {
  const [isDragging, setIsDragging] = useState(false);
  const [color, setColor] = useState("gray");

  return (
    <CellContainer 
      draggable
      isDragging={isDragging}
      isTarget={targetIndex === index}
      isBouncing={bounceCells !== null && bounceCells.includes(index)}
      onDragStart={() => {
        setActiveCell(index);
        setIsDragging(true);

        const dragIcon = document.createElement('img')
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
      color={color}
    >
      <Symbol source={cell.img} />
      <CellText text={cell.text} />
    </CellContainer>
  );
}

export default Cell;