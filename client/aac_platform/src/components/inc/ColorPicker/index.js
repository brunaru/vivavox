import { useState } from 'react';
import {
  ColorPickerContainer,
  Label,
  ColorInput
} from './styled';

function ColorPicker({ color, handleColorChange, label }) {

  return (
    <ColorPickerContainer>
      <Label>{label}</Label>
      <ColorInput type="color" value={color} onChange={handleColorChange}></ColorInput>
      <p>Cor da borda: {color}</p>
    </ColorPickerContainer>
  );
}

export default ColorPicker;