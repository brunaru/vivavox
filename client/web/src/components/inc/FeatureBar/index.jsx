import {useState} from "react";
import Button from "../Button";
import WriteBar from "../WriteBar";
import ScanControls from "../ScanControls";
import { usePhrase } from "../../contexts/PhraseContext";
import { useCell } from "../../contexts/CellContext";
import { useBoard } from "../../contexts/BoardContext";
import api from "../../../services/api";

import {
  FeatBarContainer,
  DivBack,
  BoardName,
  DivKeyboard,
  ScanMenuBar,
} from "./styled";

import returnIcon from "../../images/voltar.svg";
import speakIcon from "../../images/falar.svg";
import deleteIcon from "../../images/apagar.svg";
import cleanIcon from "../../images/limpar.svg";
import editIcon from "../../images/editar1.svg";
import saveIcon from "../../images/salvar.svg"
import scanIcon from "../../images/varredura.svg"


function FeatureBar() {
  const {clearPhrase, deleteWord, speech } = usePhrase();
  const {board, setBoard, boardStack, setBoardStack} = useBoard();
  const {editing, setEditing} = useCell();
  const [showScanMenu, setShowScanMenu] = useState(false);

  const saveText = "Salvar";
  const editText = "Editar";

  function handleEditToggle() {
    if(!editing){
      setEditing(true);
    }else{
      setEditing(false);
      window.location.reload(); 
    }
  }

  async function boardBack() {
    if(boardStack.length >= 1) {
      let newBoardStack = boardStack;
      const newBoard = newBoardStack.pop();
      setBoardStack(newBoardStack);
      
      const response = await api.get(`/board/getById/${newBoard._id}`);
      const populatedBoard = response.data;
      setBoard(populatedBoard);
    }
  }

  return (
    <>
    <FeatBarContainer $editing={editing}>
      <DivBack>
        <Button onClick={boardBack} text="Voltar" height="50%" width="7vw" image={returnIcon}/>
        <Button onClick={handleEditToggle} text={editing ? saveText : editText} height="50%" width="7vw" image={editing ? saveIcon : editIcon} key = "edit"/>
        <Button onClick={() => setShowScanMenu(prev => !prev)} text="Varredura" height="50%" width="10vw" image={scanIcon}/>
      </DivBack>
      <BoardName>{board?.name}</BoardName>
      <DivKeyboard>
        <WriteBar/>
        <Button onClick={speech} text="Falar" height="50%" width="7vw" image={speakIcon}/>
        <Button onClick={deleteWord} text="Apagar célula" height="50%" width="11vw" image={deleteIcon}/>
        <Button onClick={clearPhrase} text="Limpar" height="50%" width="7vw" image={cleanIcon}/>
      </DivKeyboard>
    </FeatBarContainer>
    {showScanMenu && (
        <ScanMenuBar>
            <ScanControls/>
        </ScanMenuBar>
    )}

    </>
  );
}

export default FeatureBar;