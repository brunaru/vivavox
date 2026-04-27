import {
  ButtonContainer
} from "./styled";

function Button(props) {
  return (
    <ButtonContainer 
      type="button"
      $color={props.color} 
      $height={props.height} 
      $fontWeight={props.fontWeight}
      $width={props.width} 
      $padding={props.padding} 
      $fontSize={props.fontSize}
      $margin={props.margin}
      $hasImage={props.image}
      onClick={props.onClick}
    >
      {props.image && (
        <img 
          src={props.image} 
          alt={props.alt || props.text || "icon"} 
          style={{ display: 'block' }}
        />
      )}
      {props.text && <span>{props.text}</span>}
    </ButtonContainer>
  );
}

export default Button;