import styled from "styled-components";

export const ButtonContainer = styled.button`
  width: ${({$width}) => ($width ? $width : "100%")};
  height: ${({$height}) => ($height ? $height : "100%")};
  background-color: ${({$color}) => ($color ? $color : "#EEEEEE")};
  padding: ${({$padding}) => ($padding ? $padding : "0")};
  border: none;
  border-radius: 8px;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: ${({$fontSize}) => ($fontSize ? $fontSize : "1.2vw")};
  border: 3px solid #525252;

  &:hover {
    cursor: pointer;
  }

  ${({ $isEditing }) =>
    $isEditing &&
    `
      filter: drop-shadow(0 4px 6px #525252);
    `
  }
`;