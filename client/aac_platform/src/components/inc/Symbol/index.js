import {
  SymbolContainer,
  SymbolImage
} from "./styled";

function Symbol({source}) {
  return (
    <SymbolContainer>
      <SymbolImage src={source} />
    </SymbolContainer>
  );
}

export default Symbol;