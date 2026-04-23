import { useBoard } from '../../../contexts/BoardContext';
import { useUser } from '../../../contexts/UserContext';
import CellText from '../../CellText';
import Symbol from '../../Symbol';
import {
  BoardPreviewContainer
} from './styled';

function BoardPreview(props) {
  const {updateCurrentBoard} = useUser();

  if(!props.board || !props.board.cells) {
    return <BoardPreviewContainer></BoardPreviewContainer>
  }

  return(
    <BoardPreviewContainer $width={props.width} $height={props.height} onClick={() => updateCurrentBoard(props.board)}>
      {props.board.cells.length > 0 ? (
        <>
          <Symbol source={props.board.imgPreview} />
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