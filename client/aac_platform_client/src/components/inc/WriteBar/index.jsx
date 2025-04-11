import { usePhrase } from "../../contexts/PhraseContext";
import {
  WriteBarContainer
} from "./styled";

function WriteBar() {
  const { currentPhrase } = usePhrase();

  return (
    <WriteBarContainer
      type="text"
      value={currentPhrase}
      placeholder="Sua frase aparecerá aqui"
      readOnly
    />
  );
}

export default WriteBar;