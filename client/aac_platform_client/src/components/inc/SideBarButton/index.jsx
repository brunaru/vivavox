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
      $activeButton={props.activeButton.startsWith(props.to)}
      onClick={() => {
        if(editarText === 'Editar') {
          setEditarText(saveText);
          props.setEditing(true);
        } else if(editarText === saveText) {
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