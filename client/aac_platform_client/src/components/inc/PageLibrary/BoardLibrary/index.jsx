import Carousel from '../Carousel';
import LibraryHeader from '../LibraryHeader';
import {
  BoardLibraryContainer,
  LibrarySpace
} from './styled';

function BoardLibrary() {
  return(
    <BoardLibraryContainer>
      <LibraryHeader/>
      <LibrarySpace>
        <Carousel title="Favoritas"/>
        <Carousel title="Minhas pranchas"/>
        <Carousel title="Animais"/>
        <Carousel title="Core words"/>
        <Carousel title="Verbos"/>
      </LibrarySpace>
    </BoardLibraryContainer>
  );
}

export default BoardLibrary;