import { createContext, useContext, useState, useCallback } from "react";
import api from "../../services/api";

const BoardContext = createContext();

export function BoardContextProvider({ children }) {
  const [board, setBoard] = useState({});
  const [categorizedBoards, setCategorizedBoards] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategorizedBoards = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await api.get('/board/getTagBoards');
      setCategorizedBoards(response.data || {});
    } catch(err) {
      console.error("BoardContext: Error fetching categorized boards:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchBoard = useCallback(async (boardIdOrKey) => { 
    if(!boardIdOrKey) {
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
        cells: response.data.cells,
        tags: response.data.tags,
        imgPreview: response.data.imgPreview
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
      categorizedBoards,
      fetchCategorizedBoards,
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