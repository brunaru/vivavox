import { useCell } from '../../contexts/CellContext';
import ConfigHeader from '../ConfigHeader';
import Input from '../Input';
import ConfirmButton from '../ConfirmButton';
import {
  ConfigMenuContainer,
  ConfigCellContainer,
  ConfigCellForm
} from './styled';
import ColorPicker from '../ColorPicker';
import axios from 'axios';
import { useState } from 'react';

function ConfigMenu() {
  const {configCell, setConfigCell} = useCell();
  const [text, setText] = useState(configCell.text);
  const [color, setColor] = useState(configCell.color);

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

  return (
    <ConfigMenuContainer>
      <ConfigHeader/>
      {
        configCell &&
        <ConfigCellContainer>
          <ConfigCellForm>
            <Input text={text} handleTextChange={handleTextChange} label="Texto" />
            <ColorPicker color={color} handleColorChange={handleColorChange} label="Cor da borda"/>
          </ConfigCellForm>
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