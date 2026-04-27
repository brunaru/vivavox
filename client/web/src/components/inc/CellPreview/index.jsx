import { useCell } from '../../contexts/CellContext';
import CellText from '../CellText';
import Symbol from '../Symbol';
import {
  CellPreviewContainer
} from './styled';

function CellPreview(props) {
  const {editing, configCell, setConfigCell} = useCell();

  function openConfigMenu() {
    if(editing) {
      if(!configCell) {
        setConfigCell({ indexOnBoard: props.index, cellType: "cell" });
      }
    } 
  }

  return(
    <CellPreviewContainer onClick={() => openConfigMenu()}>
      {
        editing &&
        <Symbol source="https://static.arasaac.org/pictograms/3220/3220_300.png"/>
      }
    </CellPreviewContainer>
  );
}

export default CellPreview;