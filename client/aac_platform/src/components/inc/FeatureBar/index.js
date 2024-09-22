import Button from "../Button";
import WriteBar from "../WriteBar";

import {
  FeatBarContainer,
  DivBack,
  DivKeyboard
} from "./styled";


function FeatureBar() {
  return (
    <FeatBarContainer>
      <DivBack>
        <Button text="Voltar" height="50%" width="5vw"/>
      </DivBack>
      <DivKeyboard>
        <Button text="Falar" height="50%" width="5vw"/>
        <WriteBar/>
        <Button text="Apagar" height="50%" width="5vw"/>
        <Button text="Limpar" height="50%" width="5vw"/>
      </DivKeyboard>
    </FeatBarContainer>
  );
}

export default FeatureBar;