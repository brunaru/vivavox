import styled from "styled-components";

export const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  filter: drop-shadow(0 4px 3px gray);
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 120px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

  &:active {
    opacity: 0.6;
  }
`;