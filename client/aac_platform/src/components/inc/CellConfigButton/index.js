import ConfigBar from "../ConfigBar";
import {
  ConfigBarList,
  ButtonContainer
} from "./styled";

function CellConfigButton({ content }) {
  return (
    <ButtonContainer>
      <ConfigBarList>
        <ConfigBar/>
        <ConfigBar/>
        <ConfigBar/>
      </ConfigBarList>
    </ButtonContainer>
  );
}

export default CellConfigButton;