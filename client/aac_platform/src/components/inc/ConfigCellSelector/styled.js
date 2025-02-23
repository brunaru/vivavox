import styled from "styled-components";

export const SelectorContainer = styled.div`
  margin: 40px 40px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 55%;
  height: 280px;
  overflow: hidden;
  border-radius: 6px;
`;

export const ConfigCellPictograms = styled.div`
  // flex: 1;
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

export const PictogramItem = styled.div`
  position: relative;
  border: solid 2px black;
  border-radius: 6px;
  max-height: 52px;

  &:hover {
    cursor: pointer;
    ${({ $currentPictogram }) =>
      !$currentPictogram &&
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

  ${({ $currentPictogram }) =>
    $currentPictogram &&
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