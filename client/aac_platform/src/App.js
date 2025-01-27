import { createGlobalStyle } from "styled-components"; 
import styled from "styled-components";
import { CellContextProvider } from "./components/contexts/CellContext";
import { PhraseContextProvider } from "./components/contexts/PhraseContext";
import PageHome from "./components/pages/PageHome";
import { BoardContextProvider } from "./components/contexts/BoardContext";

const AppContainer = styled.div`
  height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    height: 100vh;
    background-color: #EAEAEA;
  }
  
  #root {
    height: 100%;
  }
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle/>
      <BoardContextProvider>
        <CellContextProvider>
          <PhraseContextProvider>
            <PageHome/>
          </PhraseContextProvider>
        </CellContextProvider>
      </BoardContextProvider>
    </AppContainer>
  );
}

export default App;
