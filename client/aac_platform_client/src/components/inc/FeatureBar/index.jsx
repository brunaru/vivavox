import Button from "../Button";
import WriteBar from "../WriteBar";
import { usePhrase } from "../../contexts/PhraseContext";

import {
  FeatBarContainer,
  DivBack,
  DivKeyboard,
} from "./styled";
import { useCell } from "../../contexts/CellContext";
import { useBoard } from "../../contexts/BoardContext";


function FeatureBar() {
  const {clearPhrase, deleteWord, speech } = usePhrase();
  const {editing} = useCell();
  const {setConfigBoard} = useBoard();

  function openConfigBoard() {
    setConfigBoard(true);
  }

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
        <Button onClick={openConfigBoard} text="Editar prancha" height="50%" width="9vw"/>
      }
    </FeatBarContainer>
  );
}

export default FeatureBar;