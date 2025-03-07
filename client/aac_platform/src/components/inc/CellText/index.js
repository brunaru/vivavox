import {
  Text
} from "./styled";

function CellText({text, fontSize}) {
  return (
    <Text $fontSize={fontSize} >{text}</Text>
  );
}

export default CellText;