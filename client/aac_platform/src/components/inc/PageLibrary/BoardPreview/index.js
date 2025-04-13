import CellText from '../../CellText';
import Symbol from '../../Symbol';
import {
  BoardPreviewContainer
} from './styled';

function BoardPreview() {
  return(
    <BoardPreviewContainer>
      <Symbol source={null} />
      <CellText text={null}/>
    </BoardPreviewContainer>
  );
}

export default BoardPreview;