import styled from "styled-components";
import Button from "../Button";
import WriteBar from "../WriteBar";

const FeatBarContainer = styled.div`
  width: 100%;
  height: 12vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  filter: drop-shadow(0 4px 8px grey)
`;

const Div1 = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 4vw;
`;

const Div2 = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 1vw;
`;


function FeatureBar() {
  return (
    <FeatBarContainer>
      <Div1>
        <Button text="Voltar"/>
      </Div1>
      <Div2>
        <Button text="Falar"/>
        <WriteBar/>
        <Button text="Apagar"/>
        <Button text="Limpar"/>
      </Div2>
    </FeatBarContainer>
  );
}

export default FeatureBar;