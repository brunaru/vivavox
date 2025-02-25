import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Input from '../Input';
import Symbol from '../Symbol';
import SearchButton from '../SearchButton';
import {
  StandardCellMenuContainer,
  SearchField,
  StandardCells,
  CellItem
} from './styled';
import { useCell } from '../../contexts/CellContext';
import CellText from '../CellText';

function StandardCellMenu() {
  const {configCell, setConfigCell} = useCell();
  const [keyText, setKeyText] = useState("");
  const [foundCells, setFoundCells] = useState([]);
  const pictogramUrlPrefix = 'https://static.arasaac.org/pictograms/';

  function handleKeyTextChange(e) {
    setKeyText(e.target.value);
  }

  async function handleSearchClick() {
    if(!keyText.trim()) return;

    try {
      const response = await axios.get(`http://localhost:5000/cell/getByText/${keyText}`);
      setFoundCells(response.data);
    } catch(error) {
      console.log("Error searching for cells");
    }
    

  }

  function handleCellClick(clickedCell) {
    setConfigCell({ ...configCell, ...clickedCell });
  }

  return (
    <StandardCellMenuContainer>
      <SearchField>
        <Input 
          text={keyText} 
          handleTextChange={handleKeyTextChange} 
          type="text"  
          label="Buscar célula:"
        />
        <SearchButton handleSearchClick={handleSearchClick} />
      </SearchField>
      <StandardCells>
          {foundCells.map((cell, index) => {
            return (
              <CellItem
                key={index}
                $currentCell={configCell._id === cell._id}
                onClick={() => handleCellClick(cell)}
              >
                <Symbol source={`${cell.img}`}/>
                <CellText text={cell.text} fontSize="10px"/>
              </CellItem>
            );
          })}
        </StandardCells>
    </StandardCellMenuContainer>
  );
}

export default StandardCellMenu;