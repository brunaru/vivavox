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
            />
          </BoardItem>
        );
      })}
    </BoardContainer>
  );
}

export default Board;