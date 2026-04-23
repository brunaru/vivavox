import styled from "styled-components";

export const Text = styled.p`
  display: flex;
  text-align: center;
  align-items: center;
  margin: 0;
  padding: 6px 0 7px 0;
  height: 27%;
  line-height: 1;
  font-weight: 600;
  font-size: ${({$fontSize}) => ($fontSize ? $fontSize : "19px")};
`;