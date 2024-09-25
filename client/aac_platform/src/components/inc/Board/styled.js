import styled from "styled-components";

export const BoardContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  padding: 2% 2.3%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  column-gap: 2.3%;
  row-gap: 2.5%;
  box-sizing: border-box;

  div {
    display: flex;
    justify-content: center; 
    align-items: center; 
    text-align: center; 
  }
`;

export const BoardItem = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  text-align: center; 
`;