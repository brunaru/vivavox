import styled from "styled-components";

export const StandardCellMenuContainer = styled.div`
  margin: 0;
  padding: 10px 0 6px 6px;
  display: flex;
  flex-direction: column;
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

export const CellItem = styled.div`
  position: relative;
  border: solid 2px black;
  border-radius: 6px;
  height: 80px;
  width: 56px;
  text-wrap: wrap;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 6px;

  &:hover {
    cursor: pointer;
    ${({ $currentCell }) =>
      !$currentCell &&
      `
        &:before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border: solid 5px #003466;
          border-radius: 8px;
          pointer-events: none;
        }
      `
    }
  }

  ${({ $currentCell }) =>
    $currentCell &&
    `
      &:before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border: solid 5px #003466;
        border-radius: 8px;
        pointer-events: none;
      }
    `
  }
`;