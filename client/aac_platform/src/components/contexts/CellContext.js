import { createContext, useContext, useState } from "react";

// Create the context:
const CellContext = createContext();

// Create a provider:
export function CellContextProvider({ children }) {
  const [activeCell, setActiveCell] = useState(null);
  const [editing, setEditing] = useState(false);

  return (
    <CellContext.Provider value={{ 
      activeCell, 
      setActiveCell, 
      editing, 
      setEditing 
    }}>
    {children}
    </CellContext.Provider>
  );
}

// Hook for context usage:
export function useCell() {
  return useContext(CellContext);
}