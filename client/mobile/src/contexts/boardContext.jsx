import { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../services/api.js";
import { useUser } from "./userContext.jsx";

const BoardContext = createContext();

export function BoardContextProvider({ children }) {
  const [board, setBoard] = useState(null);
  const [categorizedBoards, setCategorizedBoards] = useState({});
  const [isLoadingCategorized, setIsLoadingCategorized] = useState(false);
  const [categorizedError, setCategorizedError] = useState(null);
  const [isLoadingUserBoard, setIsLoadingUserBoard] = useState(false);
  const [userBoardError, setUserBoardError] = useState(null);
  const [configBoard, setConfigBoard] = useState(false);
  const [boardStack, setBoardStack] = useState([]);
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);
  const { user, isAuthenticated } = useUser();

  const currentUserBoardId = user?.currentBoard;
  
  function getErrorMessage(err){
    return(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load board"
    );
  }

  const fetchCategorizedBoards = useCallback(async () => {
    setIsLoadingCategorized(true);
    setCategorizedError(null);
    
    try {
      const response = await api.get('/board/getTagBoards');
      setCategorizedBoards(response.data || {});
    } catch(err) {
      console.error("BoardContext: Error fetching categorized boards:", err);
      setCategorizedError(getErrorMessage(err));
      setCategorizedBoards({});
    } finally {
      setIsLoadingCategorized(false); 
    }
  }, []);

  const fetchBoardById = useCallback(async (boardId) => { 
    if (!boardId) {
      setBoard(null); 
      setUserBoardError(null); 
      setIsLoadingUserBoard(false); 
      return; 
    }

    setIsLoadingUserBoard(true);
    setUserBoardError(null);
    try {
      const response = await api.get(`/board/getById/${boardId}`);

      if (response.data) {
        setBoard({
          _id: response.data._id,
          name: response.data.name,
          numCells: response.data.numCells,
          dimensions: response.data.dimensions,
          cells: response.data.cells || [],
          tags: response.data.tags,
          imgPreview: response.data.imgPreview,
        });
      } else {
        setBoard(null);
        setUserBoardError(`Board with ID ${boardId} not found.`); 
      }

    } catch (err) {
      console.error("BoardContext: Error fetching user's board:", err.response?.data || err.message);
      setUserBoardError(getErrorMessage(err)); 
      setBoard(null); 
    } finally {
      setIsLoadingUserBoard(false); 
    }
  }, []);

  const navigateBack = useCallback(() => {
    if (boardStack && boardStack.length > 0) {
      setBoardStack((prevStack) => {
        const nextStack = [...prevStack];
        const previousBoard = nextStack.pop();
        if (previousBoard) {
          setBoard(previousBoard);
        }
        return nextStack;
      });
    }
  }, [boardStack]);

  useEffect(() => {
    if (!isAuthenticated) {
      setHasInitialLoaded(false);
      setBoard(null);
      setBoardStack([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && currentUserBoardId && !hasInitialLoaded) {
      fetchBoardById(currentUserBoardId);
      setHasInitialLoaded(true);
    }
  }, [isAuthenticated, currentUserBoardId, fetchBoardById, hasInitialLoaded]);

  return(
    <BoardContext.Provider value={{
      board,
      setBoard,
      configBoard,
      setConfigBoard,
      categorizedBoards,
      fetchCategorizedBoards,
      fetchBoardById,
      isLoadingUserBoard, 
      userBoardError,     
      isLoadingCategorized, 
      categorizedError,      
      boardStack,
      setBoardStack,
      navigateBack
    }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}