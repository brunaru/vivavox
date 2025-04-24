import styled from "styled-components";

export const BoardContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  padding: 1% 1%;
  grid-template-columns: repeat(${({$dimensions}) => ($dimensions[1])}, 1fr);
  grid-template-rows: repeat(${({$dimensions}) => ($dimensions[0])}, 1fr);
  row-gap: max(12px, 1.5%); // Mínimo de 5px, ou 1.5% da altura se for maior
  column-gap: max(10px, 1.5%); // Mínimo de 5px, ou 1.5% da largura se for maior
  box-sizing: border-box;
  grid-auto-flow: row;

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
  min-height: 0;
`;