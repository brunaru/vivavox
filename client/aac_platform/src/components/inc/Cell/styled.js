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
  filter: ${({ color }) => `drop-shadow(0 4px 3px ${color || 'gray'})`};
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 120px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    filter: ${({ color }) => `drop-shadow(0 4px 6px ${color || 'gray'})`};
  }

  &:active {
    opacity: 0.6;
  }

  ${({ isDragging }) =>
    isDragging &&
    `
      opacity: 1;
      background-color: #999;
    `
  }

  ${({ isTarget }) =>
    isTarget &&
    `
      background-color: #777;
    `
  }

  ${({ isBouncing }) =>
    isBouncing &&
    css`
      animation: ${bounce} 0.3s ease-in-out;
    `
  }
`;