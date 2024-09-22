import styled from "styled-components";

export const ButtonContainer = styled.button`
  width: ${({$width}) => ($width ? $width : "100%")};
  height: ${({$height}) => ($height ? $height : "100%")};
  background-color: ${({$color}) => ($color ? $color : "#EAEAEA")};
  border: none;
  border-radius: 8px;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2vw;

  &:hover {
    cursor: pointer;
  }
`;