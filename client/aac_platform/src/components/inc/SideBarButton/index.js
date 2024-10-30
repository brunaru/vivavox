import { useState } from "react";
import {
  ButtonContainer
} from "./styled";

function SideBarButton(props) {
  const [editarText, setEditarText] = useState(props.text);

  return (
    <ButtonContainer 
      $color={props.color} 
      $height={props.height} 
      $width={props.width} 
      $padding={props.padding} 
      $fontSize={props.fontSize}
      $isEditing={props.editing}
      $activeButton={props.text === props.activeButton}
      onClick={() => {
        props.setActiveButton(props.text);

        if(editarText === 'Editar') {
          setEditarText('Confirmar edição');
          props.setEditing(true);
        } else if(editarText === 'Confirmar edição') {
          props.setActiveButton("Prancha padrão");
          setEditarText(props.text);
          props.setEditing(false);
        }
      }}
    >
      {editarText}
    </ButtonContainer>
  );
}

export default SideBarButton;