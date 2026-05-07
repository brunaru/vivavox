import styled from "styled-components";

export const FeatBarContainer = styled.div`
  width: 100%;
  height: 12vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  filter: drop-shadow(0 4px 8px grey);
  padding: 0 2vw;
  box-sizing: border-box;
  z-index: 4;
  gap: 1.5vw;

  ${({ $editing }) =>
    $editing &&
    `
      padding: 0 4vw 0 4vw;
    `
  }
`;

export const DivBack = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5vw;
  margin-right: 0vw;
`;

export const BoardName = styled.h1`
  font-size: 1.2vw;
  font-weight: 600;
  min-width: fit-content;
  margin-right: 7vw;
  flex: 1 1 100%;     
  min-width: 0;
  white-space: normal; 
  word-break: normal;  
`;

export const DivKeyboard = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  gap: 0.5vw;
`;

export const ScanMenuBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65vw;
  margin: 0 auto; 
  padding: 6px 12px;
`;
