import CellText from "../CellText";
import Symbol from "../Symbol";
import {
  CellContainer
} from "./styled";


function Cell({ index, text, img, setActiveCell, onDrop }) {
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
      <Symbol source={img} />
      <CellText text={text} />
    </CellContainer>
  );
}

export default Cell;