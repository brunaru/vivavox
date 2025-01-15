import Button from "../Button";
import WriteBar from "../WriteBar";
import { usePhrase } from "../../contexts/PhraseContext";

import {
  FeatBarContainer,
  DivBack,
  DivKeyboard
} from "./styled";


function FeatureBar() {
  const {clearPhrase, deleteWord } = usePhrase();

  return (
    <FeatBarContainer>
      <DivBack>
        <Button text="Voltar" height="50%" width="5vw"/>
      </DivBack>
      <DivKeyboard>
        <Button text="Falar" height="50%" width="5vw"/>
        <WriteBar/>
        <Button onClick={deleteWord} text="Apagar" height="50%" width="5vw"/>
        <Button onClick={clearPhrase} text="Limpar" height="50%" width="5vw"/>
      </DivKeyboard>
    </FeatBarContainer>
  );
}

export default FeatureBar;