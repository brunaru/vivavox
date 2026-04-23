import styled from "styled-components";

export const SignUpFormContainer = styled.form`
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.3vw;
`;

export const EnterButton = styled.button`
  width: ${({$width}) => ($width ? $width : "100%")};
  height: ${({$height}) => ($height ? $height : "100%")};
  background-color: ${({$color}) => ($color ? $color : "#003466")};
  padding: ${({$padding}) => ($padding ? $padding : "0")};
  border: none;
  border-radius: 8px;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: ${({$fontSize}) => ($fontSize ? $fontSize : "1.2vw")};
  margin: ${({$margin}) => ($margin ? $margin : "0")};
  color: white;

  &:hover {
    cursor: pointer;
    filter: drop-shadow(0 2px 2px #525252);
  }
`;