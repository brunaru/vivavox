import styled from "styled-components";

export const StandardCellMenuContainer = styled.div`
  margin: 0;
  padding: 10px 0 6px 6px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;
  max-height: 220px;
`;

export const SearchField = styled.div`
  width: 100%;
  display: flex;
`;

export const StandardCells = styled.div`
  margin: 0;
  padding: 10px 0 6px 6px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  overflow-y: auto;
  max-height: 220px;
`;