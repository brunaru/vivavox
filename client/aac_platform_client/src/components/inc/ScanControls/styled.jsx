// client/aac_platform_client/src/components/inc/ScanControls/styled.jsx
import styled from 'styled-components';

export const ControlsContainer = styled.div`
  width: calc(100% - 40px);
  max-width: 900px;
  margin: 0 auto 20px auto;
  padding: 12px 20px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between; /* Alterado para distribuir melhor os grupos */
  gap: 20px;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

// Novo componente para agrupar controles relacionados
export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Espaçamento interno do grupo */
  flex-wrap: wrap;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const Label = styled.span`
  font-weight: bold;
  color: #333;
  font-size: 1rem;
`;

export const KeyDisplay = styled.span`
  padding: 8px 12px;
  background-color: #e9ecef;
  border-radius: 6px;
  font-family: monospace;
  font-size: 1.1rem;
  color: #495057;
  border: 1px solid #ced4da;
`;

// Mantido como um grupo específico para velocidade
export const SpeedControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SpeedButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ced4da;
  background-color: #f8f9fa;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9ecef;
  }
`;

export const SpeedDisplay = styled.span`
  font-weight: bold;
  font-family: monospace;
  font-size: 1rem;
  color: #495057;
  min-width: 50px;
  text-align: center;
`;

