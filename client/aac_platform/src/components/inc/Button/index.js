import {
  ButtonContainer
} from "./styled";

function Button(props) {
  return (
    <ButtonContainer $color={props.color} $height={props.height} $width={props.width}>
      {props.text}
    </ButtonContainer>
  );
}

export default Button;