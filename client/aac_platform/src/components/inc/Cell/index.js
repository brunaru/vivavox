import {
  CellContainer
} from "./styled";


function Cell({ index, text, setActiveCell, onDrop }) {
  return (
    <CellContainer 
      draggable 
      onDragStart={() => setActiveCell(index)} 
      onDragEnd={() => setActiveCell(null)}
      onDrop={() => {
        onDrop();
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <p>{index+ " " + text}</p>
    </CellContainer>
  );
}

export default Cell;