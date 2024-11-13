import { useState } from 'react';
import colorIcon from '../../images/color-icon.svg';
import {
  ColorPickerContainer,
  Label,
  ColorInput
} from './styled';

function ColorPicker({ label }) {
  const [color, setColor] = useState("#EEEEEE");

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  return (
    <ColorPickerContainer>
      <Label>{label}</Label>
      <ColorInput type="color" value={color} onChange={handleColorChange}></ColorInput>
      <p>Cor da borda: {color}</p>
    </ColorPickerContainer>
  );
}

export default ColorPicker;