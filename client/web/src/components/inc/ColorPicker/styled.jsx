import styled from "styled-components";

export const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`

`;

export const ColorInput = styled.input`
  width: 46px;
  height: 46px;
  border-radius: 8px;
  border: none;
  padding: 1px;
  cursor: pointer;
  background-color: transparent; /* Remove o background padrão */
  background-size: 100% 100%;
  box-sizing: border-box;

  &:hover {
    filter: drop-shadow(0 2px 2px gray);
  }

  &::-webkit-color-swatch {
    border-radius: 8px;
    border: none;
  }

  &::-moz-color-swatch {
    border-radius: 50%;
    border: none;
  }
  `;