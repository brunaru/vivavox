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
  const {board} = useBoard();
  const [categories, setCategories] = useState([]);

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
    </LibraryHeaderContainer>
  );
}

export default LibraryHeader;