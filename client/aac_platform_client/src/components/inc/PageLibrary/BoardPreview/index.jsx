import { useBoard } from '../../../contexts/BoardContext';
import CellText from '../../CellText';
import Symbol from '../../Symbol';
import {
  BoardPreviewContainer
} from './styled';

function BoardPreview(props) {
  if(!props.board || !props.board.cells) {
    return <BoardPreviewContainer></BoardPreviewContainer>
  }

  return(
    <BoardPreviewContainer>
      {props.board.cells.length > 0 ? (
        <>
          <Symbol source={props.board.cells[0].img} />
          <CellText text={props.board.name}/>
        </>
      ) : (
        <>
          <Symbol source={null} />
          <CellText text={null}/>
        </>
      )}
    </BoardPreviewContainer>
  );
}

export default BoardPreview;