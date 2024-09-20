import { createGlobalStyle } from "styled-components"; 
import styled from "styled-components";
import PageHome from "./components/pages/PageHome";

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
      <PageHome/>
    </AppContainer>
  );
}

export default App;
