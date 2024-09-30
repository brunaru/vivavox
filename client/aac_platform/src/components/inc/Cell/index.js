import {
  CellContainer
} from "./styled";


function Cell({ index, text, setActiveCell }) {
  return (
    <CellContainer 
      draggable 
      onDragStart={() => setActiveCell(index)} 
      onDragEnd={() => setActiveCell(null)}
    >
      <p>{text}</p>
    </CellContainer>
  );
}

export default Cell;