import styled from "styled-components";

export const ConfigBarContainer = styled.div`
  background-color: ${({$color}) => ($color ? $color : "#444")};
  width: ${({$width}) => ($width ? $width : "20px")};
  height: ${({$height}) => ($height ? $height : "3px")};
  border-radius: 2px;
`;