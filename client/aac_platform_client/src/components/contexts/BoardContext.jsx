import { createContext, useContext, useState, useCallback } from "react";
import api from "../../services/api";

const BoardContext = createContext();

export function BoardContextProvider({ children }) {
  const [board, setBoard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBoard = useCallback(async (boardIdOrKey) => { 
    if (!boardIdOrKey) {
      console.warn("fetchBoard called without an ID/key.");
      setError("No board selected to search.");
      return; 
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/board/get/${boardIdOrKey}`); 

      setBoard({
        _id: response.data._id,
        name: response.data.name,
        numCells: response.data.numCells,
        cells: response.data.cells
      });

    } catch (err) {
      console.error("BoardContext: Error searching for board:", err);
      setError(err.message || 'Failed to load board.');
      setBoard(null); 
    } finally {
      setIsLoading(false);
    }
  }, []);

  return(
    <BoardContext.Provider value={{
      board,
      setBoard,
      fetchBoard,
      isLoading,
      error
    }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}