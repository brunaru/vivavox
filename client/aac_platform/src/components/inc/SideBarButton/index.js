import { useState } from "react";
import {
  ButtonContainer
} from "./styled";

function SideBarButton(props) {
  const [editarText, setEditarText] = useState(props.text);

  const saveText = 'Salvar edição';

  return (
    <ButtonContainer 
      to={props.to}
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
          setEditarText(saveText);
          props.setEditing(true);
        } else if(editarText === saveText) {
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