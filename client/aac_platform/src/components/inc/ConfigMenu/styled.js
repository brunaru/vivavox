import styled from "styled-components";

export const ConfigMenuContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 66%;
  height: 76%;
  background-color: white;
  border-radius: 8px;
  filter: drop-shadow(0 6px 8px gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

export const ConfigCellContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ConfigCellForm = styled.form`
  background-color: white;
  width: 35%;
  margin: 40px 0 0 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const ConfigCellSelector = styled.div`
  margin: 40px 40px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 55%;
  height: 400px;
  overflow: hidden;
  border-radius: 6px;
`;

export const ConfigCellPictograms = styled.div`
  flex: 1;
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
  max-height: 100%;
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