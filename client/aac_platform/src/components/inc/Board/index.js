import { useState, useEffect } from "react";
import axios from 'axios';
import Cell from "../Cell";
import {
  BoardContainer,
  BoardItem
} from "./styled";


function Board() {
  const [cells, setCells] = useState([
    {
      text: "eu",
      img: "https://static.arasaac.org/pictograms/6632/6632_300.png"
    },
    {
      text: "você",
      img: "https://static.arasaac.org/pictograms/6625/6625_300.png"
    },
    {
      text: "ele",
      img: "https://static.arasaac.org/pictograms/6481/6481_300.png"
    },
    {
      text: "ela",
      img: "https://static.arasaac.org/pictograms/7029/7029_300.png"
    },
    {
      text: "nós",
      img: "https://static.arasaac.org/pictograms/7186/7186_300.png"
    },
    {
      text: "isto",
      img: "https://static.arasaac.org/pictograms/7095/7095_300.png"
    },
    {
      text: "comer",
      img: "https://static.arasaac.org/pictograms/6456/6456_300.png"
    },
    {
      text: "beber",
      img: "https://static.arasaac.org/pictograms/6061/6061_300.png"
    },
    {
      text: "gostar",
      img: "https://static.arasaac.org/pictograms/37826/37826_300.png"
    },
    {
      text: "querer",
      img: "https://static.arasaac.org/pictograms/31141/31141_300.png"
    },
    {
      text: "dormir",
      img: "https://static.arasaac.org/pictograms/6479/6479_300.png"
    },
    {
      text: "sentir",
      img: "https://static.arasaac.org/pictograms/30196/30196_300.png"
    },
    {
      text: "falar",
      img: "https://static.arasaac.org/pictograms/6517/6517_300.png"
    },
    {
      text: "contar",
      img: "https://static.arasaac.org/pictograms/6461/6461_300.png"
    },
    {
      text: "pensar",
      img: "https://static.arasaac.org/pictograms/8661/8661_300.png"
    },
    {
      text: "ver",
      img: "https://static.arasaac.org/pictograms/6564/6564_300.png"
    },
    {
      text: "pegar",
      img: "https://static.arasaac.org/pictograms/10148/10148_300.png"
    },
    {
      text: "dar",
      img: "https://static.arasaac.org/pictograms/17040/17040_300.png"
    },
    {
      text: "sim",
      img: "https://static.arasaac.org/pictograms/5584/5584_300.png"
    },
    {
      text: "não",
      img: "https://static.arasaac.org/pictograms/5526/5526_300.png"
    },
    {
      text: "quem",
      img: "https://static.arasaac.org/pictograms/9853/9853_300.png"
    },
    {
      text: "onde",
      img: "https://static.arasaac.org/pictograms/7764/7764_300.png"
    },
    {
      text: "quando",
      img: "https://static.arasaac.org/pictograms/22621/22621_300.png"
    },
    {
      text: "por que",
      img: "https://static.arasaac.org/pictograms/36719/36719_300.png"
    }
  ]);

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
            />
          </BoardItem>
        );
      })}
    </BoardContainer>
  );
}

export default Board;