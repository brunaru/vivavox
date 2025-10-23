// client/aac_platform_client/src/components/contexts/ScanContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ScanContext = createContext();

export function useScan() {
  return useContext(ScanContext);
}

export function ScanContextProvider({ children, rows, cols, onSelect }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState('row');
  const [activeRow, setActiveRow] = useState(null);
  const [activeCol, setActiveCol] = useState(null);
  const [triggerKey, setTriggerKey] = useState('Space');
  const [scanSpeed, setScanSpeed] = useState(1500); // Estado para a velocidade

  useEffect(() => {
    let interval;
    if (isScanning) {
      if (scanMode === 'row') {
        interval = setInterval(() => {
          setActiveRow(prevRow => (prevRow === null || prevRow >= rows - 1 ? 0 : prevRow + 1));
        }, scanSpeed); // Usa a velocidade do estado
      } else if (scanMode === 'col') {
        interval = setInterval(() => {
          setActiveCol(prevCol => (prevCol === null || prevCol >= cols - 1 ? 0 : prevCol + 1));
        }, scanSpeed); // Usa a velocidade do estado
      }
    } else {
        setActiveCol(null);
        setActiveRow(null);
        setScanMode('row');
    }
    return () => clearInterval(interval);
  }, [isScanning, scanMode, rows, cols, scanSpeed]); // Adiciona scanSpeed às dependências

  const handleScanTrigger = useCallback(() => {
    if (!isScanning) {
      setIsScanning(true);
      setScanMode('row');
      setActiveRow(0);
      return;
    }
    
    if (scanMode === 'row' && activeRow !== null) {
      setScanMode('col');
      setActiveCol(0);
    } else if (scanMode === 'col' && activeRow !== null && activeCol !== null) {
      onSelect(activeRow, activeCol);
      setIsScanning(false);
    }
  }, [isScanning, scanMode, activeRow, activeCol, onSelect]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === triggerKey) {
        event.preventDefault();
        handleScanTrigger();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScanTrigger, triggerKey]);

  const value = {
    isScanning,
    setIsScanning,
    scanMode,
    activeRow,
    activeCol,
    triggerKey,
    setTriggerKey,
    scanSpeed,      // Expõe a velocidade
    setScanSpeed    // Expõe a função para mudar a velocidade
  };

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

