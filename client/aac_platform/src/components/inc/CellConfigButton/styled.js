import styled from "styled-components";

export const ConfigBarList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  gap: 4px;
`;

export const ButtonContainer = styled.button`
  background-color: #E1E1E1;
  top: 5px;
  right: 5px;
  width: 28px;
  height: 28px;
  position: absolute;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;

  &:hover {
    cursor: pointer;
    filter: drop-shadow(0 1px 2px gray);
  }
`;
