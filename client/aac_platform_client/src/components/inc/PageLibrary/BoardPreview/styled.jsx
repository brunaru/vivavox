import styled from "styled-components";

export const BoardPreviewContainer = styled.button`
  background-color: white;
  width: 70%;
  height: 70%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 2px gray);
  border: none;


  &:hover {
    cursor: pointer;
    filter: drop-shadow(0 4px 5px gray);
  }
`;