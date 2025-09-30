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
  max-height: 170px;
`;

export const PictogramSearch = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

export const InputPictogramSearch = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem 0 0 0.375rem; /* borda arredondada só à esquerda */
  border: 1px solid #cbd5e1;
  font-size: 1rem;
`;

export const ButtonPictogramSearch = styled.button`
  padding: 0.6rem 1.5rem;
  border-radius: 0 0.375rem 0.375rem 0; /* arredonda só à direita */
  background-color: #003466;
  color: white;
  border: 1px solid #003466;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    filter: drop-shadow(0 2px 2px #525252);
  }
`;


export const PictogramContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start; 
  // align-items: center;
  // gap: 16px; 
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