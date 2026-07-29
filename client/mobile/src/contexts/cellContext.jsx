import { createContext, useContext, useState } from "react";

// Create the context:
const CellContext = createContext();

// Create a provider:
export function CellContextProvider({ children }) {
  const [activeCell, setActiveCell] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [configCell, setConfigCell] = useState(null);

  function enterEditMode(target = "cell") {
    setEditing(true);
    setEditTarget(target);
  }

  function exitEditMode() {
    setEditing(false);
    setEditTarget(null);
    setConfigCell(null);
  }

  return (
    <CellContext.Provider value={{ 
      activeCell,
      setActiveCell,
      editing,
      setEditing,
      editTarget,
      setEditTarget,
      enterEditMode,
      exitEditMode,
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