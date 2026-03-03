// client/aac_platform_client/src/components/inc/ScanControls/styled.jsx
import styled from 'styled-components';

export const ControlsContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1vw;
  padding: 2vw;
  box-sizing: border-box;
  filter: drop-shadow(0 4px 8px grey);
  margin-bottom: 2vh;
`;

// Grid item para cada seção
export const GridCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1vw;
  padding: 1vw;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  width: 70%;

  &:hover {
    background-color: #ffffff;
    border-color: #dee2e6;
  }
`;

export const InnerGridCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1vw;
`;

// Componente para agrupar controles relacionados
export const ControlGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const ControlButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${({ $active, $listening }) => 
    $active ? '#E76F51' : 
    $listening ? '#ffc107' : '#007bff'};
  color: ${({ $listening }) => $listening ? 'black' : 'white'};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Label = styled.span`
  font-weight: bold;
  color: #333;
  font-size: 1vw;
  white-space: nowrap;
`;

export const KeyDisplay = styled.span`
  padding: 0.6vw 1vw;
  background-color: #e9ecef;
  border-radius: 6px;
  font-family: monospace;
  font-size: 1vw;
  color: #495057;
  border: 1px solid #ced4da;
  min-width: 3vw;
  text-align: center;
`;

export const SpeedDisplay = styled.span`
  font-weight: bold;
  font-family: monospace;
  font-size: 0.5vw;
  color: #495057;
  min-width: 2vw;
  text-align: center;
`;

export const SpeedRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  width: 100%;

  input[type='range'] {
    flex: 1;
    height: 0.4vw;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      #007bff 0%,
      #007bff var(--value),
      #e9ecef var(--value),
      #e9ecef 100%
    );
    outline: none;
    -webkit-appearance: none;
    appearance: none;

    &::-webkit-slider-thumb {
      appearance: none;
      -webkit-appearance: none;
      width: 1.2vw;
      height: 1.2vw;
      border-radius: 50%;
      background: #007bff;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      }
    }

    &::-moz-range-thumb {
      width: 1.2vw;
      height: 1.2vw;
      border-radius: 50%;
      background: #007bff;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: all 0.2s;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

// Novos estilos para detecção de piscadas
export const BlinkStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8vw;
  padding: 0.8vw 1.2vw;
  background-color: #f0f7ff;
  border-radius: 6px;
  border: 1px solid #b3d9ff;
  width: 100%;
  margin-top: 0.5vw;
`;

export const StatusIndicator = styled.div`
  width: 0.8vw;
  height: 0.8vw;
  border-radius: 50%;
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'loading':
        return '#ffc107'; // Amarelo para carregando
      case 'success':
        return '#28a745'; // Verde para sucesso
      case 'error':
        return '#dc3545'; // Vermelho para erro
      default:
        return '#6c757d'; // Cinza para ocioso
    }
  }};
  animation: ${({ $status }) =>
    $status === 'loading' ? 'pulse 1.5s ease-in-out infinite' : 'none'};
  flex-shrink: 0;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const StatusText = styled.span`
  font-size: 0.85vw;
  color: #495057;
  font-weight: 500;
  white-space: nowrap;
`;