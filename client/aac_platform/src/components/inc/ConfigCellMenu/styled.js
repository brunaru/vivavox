import styled from "styled-components";

export const ConfigCellMenuContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 66%;
  height: 76%;
  background-color: white;
  border-radius: 8px;
  filter: drop-shadow(0 6px 8px gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;