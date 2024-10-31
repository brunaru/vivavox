import styled from "styled-components";

export const ButtonContainer = styled.button`
  width: ${({$width}) => ($width ? $width : "100%")};
  height: ${({$height}) => ($height ? $height : "100%")};
  background-color: ${({$activeButton}) => ($activeButton ? "#EEEEEE" : "white")};
  padding: ${({$padding}) => ($padding ? $padding : "0")};
  border: none;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: ${({$fontSize}) => ($fontSize ? $fontSize : "1.2vw")};

  &:hover {
    cursor: pointer;
    background-color: #EEEEEE;
  }

  &:active {
    background-color: #EEEEEE;
  }

  ${({ $activeButton }) =>
    $activeButton &&
    `
      filter: drop-shadow(0 1px 4px #525252);
    `
  }
`;