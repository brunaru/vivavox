import styled from "styled-components";

export const CellContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  filter: drop-shadow(0 4px 3px gray);
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 120px;


  &:hover {
    cursor: pointer;
  }
`;