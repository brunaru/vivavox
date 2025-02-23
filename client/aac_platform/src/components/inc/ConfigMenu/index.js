import { useCell } from '../../contexts/CellContext';
import ConfigHeader from '../ConfigHeader';
import Input from '../Input';
import ConfirmButton from '../ConfirmButton';
import ColorPicker from '../ColorPicker';
import ConfigCellSelector from '../ConfigCellSelector';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useBoard } from '../../contexts/BoardContext';
import api from '../../../services/api';
import {
  ConfigMenuContainer,
  ConfigCellContainer,
  SettingsContainer,
  ConfigCellForm
} from './styled';


function ConfigMenu() {
  const {configCell, setConfigCell} = useCell();
  const {board, setBoard} = useBoard();
  const [text, setText] = useState(configCell?.text || '');
  const [color, setColor] = useState(configCell?.color || '#000000');
  const [image, setImage] = useState(configCell?.img || '');
  const [pictograms, setPictograms] = useState([]);

  const getPictogramsByText = useCallback(() => {
    if(!text.trim()) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.arasaac.org/v1/pictograms/pt/search/${text}`);
        setPictograms(response.data);
      } catch(error) {
        console.log("Error searching for pictograms");
      }
    };

    // Waits 500ms before fetch:
    const delay = setTimeout(fetchData, 500);

    // Cancels requisition if 'text' changes before 500ms:
    return () => clearTimeout(delay);
  }, [text]);

  async function updateCellAndBoard() {
    try {
      if(!configCell) return;

      // Verify if cell changes has been made:
      const hasChanges = 
        text !== configCell.text || 
        color !== configCell.color ||
        image !== configCell.img;

      // Make updates to the cell and board:
      if(hasChanges) {
        const updatedCell = { ...configCell, text: text, color: color, img: image };
        const response = await api.patch(`/userCell/patch/${updatedCell._id}`, updatedCell);
        console.log("Cell successfully sent to api");

        const newCellId = response.data.finalId;

        setBoard((prevBoard) => ({
          ...prevBoard,
          cells: prevBoard.cells.map((cell) => 
            cell._id === updatedCell._id ? { ...cell, _id: newCellId, cellType: "userCell" } : cell
          )
        }));
      } else {
        console.log("No change has been made");
      }

      setConfigCell(null);
    } catch(error) {
      console.log("Error sending cell personalization: ", error);
    }
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }
  
  useEffect(() => {
    getPictogramsByText();
  }, [text, getPictogramsByText]);

  return (
    <ConfigMenuContainer>
      <ConfigHeader text1="Célula" text2="Prancha"/>
      {
        configCell &&
        <ConfigCellContainer>
          <SettingsContainer>
            <ConfigCellForm>
              <Input text={text} handleTextChange={handleTextChange} label="Texto" />
              <ColorPicker color={color} handleColorChange={handleColorChange} label="Cor da borda"/>
            </ConfigCellForm>
            <ConfigCellSelector 
              pictograms={pictograms}
              image={image}
              setImage={setImage}
            />
          </SettingsContainer>
          <ConfirmButton 
            updateCell={updateCellAndBoard}
            text="Confirmar" 
            height="40px" 
            width="180px" 
            margin="60px 0 60px 0" 
          />
        </ConfigCellContainer>
      }
    </ConfigMenuContainer>
  );
}

export default ConfigMenu;