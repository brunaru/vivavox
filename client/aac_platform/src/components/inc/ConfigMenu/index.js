import { useCell } from '../../contexts/CellContext';
import ConfigHeader from '../ConfigHeader';
import Input from '../Input';
import ConfirmButton from '../ConfirmButton';
import {
  ConfigMenuContainer,
  ConfigCellContainer,
  SettingsContainer,
  ConfigCellForm,
  ConfigCellPictograms
} from './styled';
import ColorPicker from '../ColorPicker';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ConfigMenu() {
  const {configCell, setConfigCell} = useCell();
  const [text, setText] = useState(configCell.text);
  const [color, setColor] = useState(configCell.color);
  const [pictograms, setPictograms] = useState([]);

  async function updateCell() {
    try {
      const updatedCell = { ...configCell, text: text, color: color };
      await axios.patch(`http://localhost:3001/cell/patch/${updatedCell._id}`, updatedCell);
      console.log("Cell successfully sent to api");
      setConfigCell(null);
    } catch(error) {
      console.log("Error sending cell update: ", error);
    }
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  async function getPictogramsByText() {
    try {
      console.log("ahoy!");
      const response = await axios.get(`https://api.arasaac.org/v1/pictograms/pt/search/${text}`);
      setPictograms(response.data);
      console.log(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPictogramsByText();
  }, []);

  return (
    <ConfigMenuContainer>
      <ConfigHeader/>
      {
        configCell &&
        <ConfigCellContainer>
          <SettingsContainer>
            <ConfigCellForm>
              <Input text={text} handleTextChange={handleTextChange} label="Texto" />
              <ColorPicker color={color} handleColorChange={handleColorChange} label="Cor da borda"/>
            </ConfigCellForm>
            <ConfigCellPictograms>
              {}
            </ConfigCellPictograms>
          </SettingsContainer>
          <ConfirmButton 
            updateCell={updateCell}
            text="Confirmar" 
            height="40px" 
            width="180px" 
            margin="150px 0 0 0" 
          />
        </ConfigCellContainer>
      }
    </ConfigMenuContainer>
  );
}

export default ConfigMenu;