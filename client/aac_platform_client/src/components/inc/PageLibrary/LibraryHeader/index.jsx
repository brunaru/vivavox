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
import { useState } from 'react';
import { useBoard } from '../../../contexts/BoardContext';

function LibraryHeader() {
  const {board} = useBoard();
  const [categories, setCategories] = useState([]);

  return(
    <LibraryHeaderContainer>
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