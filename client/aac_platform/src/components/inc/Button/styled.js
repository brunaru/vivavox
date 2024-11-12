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
  border: 2px solid #525252;
  margin: ${({$margin}) => ($margin ? $margin : "0")};

  &:hover {
    cursor: pointer;
  }
`;