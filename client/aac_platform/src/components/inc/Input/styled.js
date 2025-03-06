import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: ${({$width}) => ($width ? $width : "35%")};
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
`;

export const InputField = styled.input`
  width: 100%;
  height: 26px;
  border-radius: 6px;
  margin: 0;
  border: none;
  background-color: #DDDDDD;

  &:hover {
    background-color: #EEEEEE;
  }
`;