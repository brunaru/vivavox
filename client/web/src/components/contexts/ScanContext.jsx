// client/aac_platform_client/src/components/contexts/ScanContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useCell } from "./CellContext";

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
  const [isBlinkScanMode, setIsBlinkScanMode] = useState(false); // Novo: modo varredura por piscada
  const { editing } = useCell();
  const [showScanMenu, setShowScanMenu] = useState(false);
  const [isKeyScanMode, setIsKeyScanMode] = useState(false);

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
      // Tem que ser "&& varredura de tecla" ao inves desse !editing, essa eh uma solucao provisoria
      if (
        event.code === triggerKey &&
        isKeyScanMode &&
        !editing
      ) {
        event.preventDefault();
        event.stopPropagation();

        handleScanTrigger();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScanTrigger, triggerKey, isKeyScanMode, editing]);

  const value = {
    isScanning,
    setIsScanning,
    scanMode,
    activeRow,
    activeCol,
    triggerKey,
    setTriggerKey,
    scanSpeed,     
    setScanSpeed,    
    isBlinkScanMode, 
    setIsBlinkScanMode, 
    handleScanTrigger,
    showScanMenu,
    setShowScanMenu,
    isKeyScanMode,
    setIsKeyScanMode,
  };

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

