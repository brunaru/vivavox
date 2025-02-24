import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Input from '../Input';
import Symbol from '../Symbol';
import {
  StandardCellMenuContainer,
  SearchField,
  StandardCells,
  CellItem
} from './styled';
import { useCell } from '../../contexts/CellContext';
import CellText from '../CellText';

function StandardCellMenu() {
  const {configCell} = useCell();
  const [keyText, setKeyText] = useState("");
  const [foundCells, setFoundCells] = useState([]);
  const pictogramUrlPrefix = 'https://static.arasaac.org/pictograms/';

  function handleKeyTextChange(e) {
    setKeyText(e.target.value);
  }

  function handleCellClick(cell_id) {
    // Troca de células...
  }

  const getCellsByText = useCallback(() => {
    if(!keyText.trim()) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cell/getByText/${keyText}`);
        setFoundCells(response.data);
      } catch(error) {
        console.log("Error searching for cells");
      }
    };

    // Waits 500ms before fetch:
    const delay = setTimeout(fetchData, 500);

    // Cancels requisition if 'text' changes before 500ms:
    return () => clearTimeout(delay);
  }, [keyText]);

  useEffect(() => {
    getCellsByText();
  }, [keyText, getCellsByText]);

  return (
    <StandardCellMenuContainer>
      <SearchField>
        <Input 
          text={keyText} 
          handleTextChange={handleKeyTextChange} 
          type="text"  
          label="Buscar célula:"
        />
      </SearchField>
      <StandardCells>
          {foundCells.map((cell, index) => {
            return (
              <CellItem
                key={index}
                $currentCell={configCell._id === cell._id}
                onClick={() => handleCellClick(cell._id)}
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