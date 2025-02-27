import { createGlobalStyle } from "styled-components"; 
import styled from "styled-components";
import { CellContextProvider } from "./components/contexts/CellContext";
import { BrowserRouter } from "react-router-dom"
import Router from "./Routes";
import { PageContextProvider } from "./components/contexts/PageContext";

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
        <BrowserRouter>
          <PageContextProvider>
            <CellContextProvider>
              <Router/>
              {/* <PageCurrentBoard/>             */}
            </CellContextProvider>
          </PageContextProvider>
        </BrowserRouter>
    </AppContainer>
  );
}

export default App;
