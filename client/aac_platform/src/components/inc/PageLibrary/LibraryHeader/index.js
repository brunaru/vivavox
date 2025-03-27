import BoardPreview from '../BoardPreview';
import {
  LibraryHeaderContainer,
  CurrentBoardContainer
} from './styled';

function LibraryHeader() {
  return(
    <LibraryHeaderContainer>
      <CurrentBoardContainer>
        <BoardPreview/>
      </CurrentBoardContainer>
    </LibraryHeaderContainer>
  );
}

export default LibraryHeader;