import Button from "../Button";
import WriteBar from "../WriteBar";
import { usePhrase } from "../../contexts/PhraseContext";

import {
  FeatBarContainer,
  DivBack,
  DivKeyboard,
} from "./styled";
import { useCell } from "../../contexts/CellContext";


function FeatureBar() {
  const {clearPhrase, deleteWord, speech } = usePhrase();
  const {editing} = useCell();

  return (
    <FeatBarContainer $editing={editing}>
      <DivBack>
        <Button text="Voltar" height="50%" width="5vw"/>
      </DivBack>
      <DivKeyboard>
        <Button onClick={speech} text="Falar" height="50%" width="5vw"/>
        <WriteBar/>
        <Button onClick={deleteWord} text="Apagar" height="50%" width="5vw"/>
        <Button onClick={clearPhrase} text="Limpar" height="50%" width="5vw"/>
      </DivKeyboard>
      {
        editing &&
        <Button text="Editar prancha" height="50%" width="9vw"/>
      }
    </FeatBarContainer>
  );
}

export default FeatureBar;