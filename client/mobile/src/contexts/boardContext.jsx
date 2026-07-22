import { createContext, useContext, useState, useCallback, useEffect } from "react";
import  api  from "../services/api.js";
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
      console.log(response.data);
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
      // console.log(`BoardContext: Fetching board with ID: ${boardId}`); 
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
        console.warn(`BoardContext: Board with ID ${boardId} not found or returned no data.`);
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


  //Effect to automatically fetch the user's current board
  useEffect(() => {
    if (isAuthenticated && currentUserBoardId) {
      fetchBoardById(currentUserBoardId);
    } else {
      // If user logs out or has no currentBoard set, clear the board state
      setBoard(null);
      setUserBoardError(null);     
      setIsLoadingUserBoard(false);
    }
  }, [isAuthenticated, currentUserBoardId, fetchBoardById]);

  return(
    <BoardContext.Provider value={{
      board,
      setBoard,
      configBoard,
      setConfigBoard,
      categorizedBoards,
      fetchCategorizedBoards,
      isLoadingUserBoard, 
      userBoardError,     
      isLoadingCategorized, 
      categorizedError,      
      boardStack,
      setBoardStack
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