import { useState } from "react";
import Cell from "../Cell";
import {
  BoardContainer,
  BoardItem
} from "./styled";


function Board() {
  const [cells, setCells] = useState([
    {
      text: "eu"
    },
    {
      text: "você"
    },
    {
      text: "ele"
    },
    {
      text: "ela"
    },
    {
      text: "nós"
    },
    {
      text: "isto"
    },
    {
      text: "comer"
    },
    {
      text: "gostar"
    },
    {
      text: "querer"
    },
    {
      text: "dormir"
    },
    {
      text: "sentir"
    },
    {
      text: "falar"
    },
    {
      text: "contar"
    },
    {
      text: "pensar"
    },
    {
      text: "ver"
    },
    {
      text: "buscar"
    },
    {
      text: "pegar"
    },
    {
      text: "dar"
    },
    {
      text: "sim"
    },
    {
      text: "não"
    },
    {
      text: "quem"
    },
    {
      text: "onde"
    },
    {
      text: "quando"
    },
    {
      text: "por que"
    }
  ]);

  const [activeCell, setActiveCell] = useState(null);

  const onDrop = (position) => {
    console.log(`${activeCell} is going to place into position ${position}`);

    if(activeCell == null || activeCell === undefined) return;

    const newCells = [...cells];
    const currentCell = newCells[activeCell];
    const targetCell = newCells[position];

    newCells[position] = currentCell;
    newCells[activeCell] = targetCell;

    setCells(newCells);
    console.log(newCells);
  }

  return (
    <BoardContainer>
      {cells.map((cell, index) => {
        return (
          <BoardItem>
            <Cell 
              key={index} 
              index={index}
              text={cell.text} 
              setActiveCell={setActiveCell} 
              onDrop={() => onDrop(index)}
            />
          </BoardItem>
        );
      })}
    </BoardContainer>
  );
}

export default Board;