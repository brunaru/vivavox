import {
  SymbolContainer,
  SymbolImage
} from "./styled";

function Symbol({source}) {
  return (
    <SymbolContainer>
      <SymbolImage src={source} draggable={false} />
    </SymbolContainer>
  );
}

export default Symbol;