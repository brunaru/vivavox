import {
  ButtonContainer
} from "./styled";

function ConfirmButton(props) {
  return (
    <ButtonContainer 
      onClick={props.updateCell}
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

export default ConfirmButton;