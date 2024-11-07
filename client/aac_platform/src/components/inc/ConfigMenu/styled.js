import styled from "styled-components";

export const ConfigMenuContainer = styled.div`
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

export const ConfigCellContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ConfigCellForm = styled.form`
  background-color: white;
  width: 50%;
  margin: 40px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;