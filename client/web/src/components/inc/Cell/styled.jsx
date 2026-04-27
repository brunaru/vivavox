import styled, { keyframes, css } from "styled-components";

const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
`;

export const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  filter: drop-shadow(0 4px 5px gray);
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 120px;
  overflow: hidden;
  border: 4.5px solid ${({color}) => color};
  position: relative;
  user-select: none;

  &:hover {
    cursor: pointer;
    filter: drop-shadow(0 4px 10px gray);
  }

  &:active {
    opacity: 0.6;
  }

  ${({ $editing, color }) =>
    $editing &&
    `
      border: 3.5px dashed ${color};
    `
  }

  ${({ $isDragging }) =>
    $isDragging &&
    `
      opacity: 1;
      background-color: #999;
    `
  }

  ${({ $isTarget }) =>
    $isTarget &&
    `
      background-color: #777;
    `
  }

  ${({ $isBouncing }) =>
    $isBouncing &&
    css`
      animation: ${bounce} 0.3s ease-in-out;
    `
  }

  ${({ $isRowActive, $isCellActive }) => {
    if ($isCellActive) {
      return `
        outline: 5px solid #0056b3;
        box-shadow: 0 0 15px rgba(0, 86, 179, 0.7);
        transform: scale(1.05);
      `;
    }
    if ($isRowActive) {
      return `
        outline: 3px solid #1d6279ff; 
      `;
    }
  }}
`;