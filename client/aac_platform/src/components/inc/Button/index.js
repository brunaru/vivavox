import { useState } from "react";
import {
  ButtonContainer
} from "./styled";

function Button(props) {
  return (
    <ButtonContainer 
      $color={props.color} 
      $height={props.height} 
      $width={props.width} 
      $padding={props.padding} 
      $fontSize={props.fontSize}
      $margin={props.margin}
    >
      {props.text}
    </ButtonContainer>
  );
}

export default Button;