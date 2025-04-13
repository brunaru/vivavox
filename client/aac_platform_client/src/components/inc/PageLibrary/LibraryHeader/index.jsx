import BoardPreview from '../BoardPreview';
import Input from '../../Input';
import {
  LibraryHeaderContainer,
  CurrentBoardContainer,
  SearchBoardContainer,
  SearchSubcontainer,
  HeaderItemTitle,
  Label,
  SelectFilter,
  CreateBoardContainer
} from './styled';
import { useState, useEffect } from 'react';
import { useBoard } from '../../../contexts/BoardContext';

function LibraryHeader(props) {
  const {board, fetchBoard, isLoading, error} = useBoard();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("Board atual", board.name);
    fetchBoard(board.name);
  }, []);

  return(
    <LibraryHeaderContainer $hasShadow={props.hasShadow}>
      <CurrentBoardContainer>
        <HeaderItemTitle>Prancha atual:</HeaderItemTitle>
        <BoardPreview board={board}/>
      </CurrentBoardContainer>
      <SearchBoardContainer>
        <SearchSubcontainer>
          <Label>Procurar prancha:</Label>
          <Input/>
        </SearchSubcontainer>
        <SearchSubcontainer>
          <Label>Selecione a categoria da prancha:</Label>
          <SelectFilter>
            <option value="all">Todas</option>
            {categories}
          </SelectFilter>
        </SearchSubcontainer>
      </SearchBoardContainer>
      <CreateBoardContainer>
        <HeaderItemTitle>Criar nova prancha:</HeaderItemTitle>
        <BoardPreview/>
      </CreateBoardContainer>
    </LibraryHeaderContainer>
  );
}

export default LibraryHeader;