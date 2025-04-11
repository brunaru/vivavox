import styled from "styled-components";

export const WriteBarContainer = styled.input`
  width: 38vw;
  height: 50%;
  background-color: ${({$color}) => ($color ? $color : "#EAEAEA")};
  border: none;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 16px;

  &:hover {
    cursor: text;
  }
`;