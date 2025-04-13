import styled from "styled-components";

export const BoardLibraryContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #EAEAEA;
`;

export const LibrarySpace = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #EAEAEA;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; /* Cor da alça */
    border-radius: 4px;
    border: 2px solid #EAEAEA; /* Para integrar com o fundo */
  }
`;

