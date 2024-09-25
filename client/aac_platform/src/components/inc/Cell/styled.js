import styled from "styled-components";

export const CellContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  filter: drop-shadow(0 4px 3px gray);
  max-width: 265px;
  max-height: 90px;


  &:hover {
    cursor: pointer;
  }
`;