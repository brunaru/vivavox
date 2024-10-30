import { createContext, useContext, useState } from "react";

// Create the context:
const CellContext = createContext();

// Create a provider:
export function CellContextProvider({ children }) {
  const [activeCell, setActiveCell] = useState(null);
  const [editing, setEditing] = useState(false);
  const [configCell, setConfigCell] = useState(null);

  return (
    <CellContext.Provider value={{ 
      activeCell, 
      setActiveCell, 
      editing, 
      setEditing,
      configCell,
      setConfigCell
    }}>
    {children}
    </CellContext.Provider>
  );
}

// Hook for context usage:
export function useCell() {
  return useContext(CellContext);
}