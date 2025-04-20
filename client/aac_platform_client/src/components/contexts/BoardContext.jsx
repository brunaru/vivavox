import { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../../services/api";
import { useUser } from "./UserContext.jsx";

const BoardContext = createContext();

export function BoardContextProvider({ children }) {
  const [board, setBoard] = useState(null);
  const [categorizedBoards, setCategorizedBoards] = useState({});
  const [isLoadingCategorized, setIsLoadingCategorized] = useState(false);
  const [categorizedError, setCategorizedError] = useState(null);
  const [isLoadingUserBoard, setIsLoadingUserBoard] = useState(false);
  const [userBoardError, setUserBoardError] = useState(null);
  const { user, isAuthenticated } = useUser();

  const currentUserBoardId = user?.currentBoard;

  const fetchCategorizedBoards = useCallback(async () => {
    // Usa estados de loading/error específicos para categorias
    setIsLoadingCategorized(true);
    setCategorizedError(null);
    
    try {
      const response = await api.get('/board/getTagBoards');
      setCategorizedBoards(response.data || {});
    } catch(err) {
      console.error("BoardContext: Error fetching categorized boards:", err);
      setCategorizedError(err.response?.data?.message || err.message || 'Failed to load categorized boards.'); // Define o erro específico
      setCategorizedBoards({}); // Limpa em caso de erro
    } finally {
      setIsLoadingCategorized(false); // Finaliza o loading específico
    }
  }, []);

  const fetchBoardById = useCallback(async (boardId) => { 
    if (!boardId) {
      setBoard(null); // Clear board if no ID
      setUserBoardError(null); // Limpa erro específico
      setIsLoadingUserBoard(false); // Garante que loading específico está desligado
      return; // Exit if no board ID
    }

    // Usa estados de loading/error específicos do usuário
    setIsLoadingUserBoard(true);
    setUserBoardError(null);
    try {
      // console.log(`BoardContext: Fetching board with ID: ${boardId}`); // Optional debug log
      const response = await api.get(`/board/getById/${boardId}`);

      if (response.data) {
        setBoard({
          _id: response.data._id,
          name: response.data.name,
          numCells: response.data.numCells,
          cells: response.data.cells,
          tags: response.data.tags,
          imgPreview: response.data.imgPreview,
        });
      } else {
        console.warn(`BoardContext: Board with ID ${boardId} not found or returned no data.`);
        setBoard(null);
        setUserBoardError(`Board with ID ${boardId} not found.`); // Define erro específico
      }

    } catch (err) {
      console.error("BoardContext: Error fetching user's board:", err.response?.data || err.message);
      setUserBoardError(err.response?.data?.message || err.message || 'Failed to load board.'); // Define erro específico
      setBoard(null); // Limpa board em caso de erro
    } finally {
      setIsLoadingUserBoard(false); // Finaliza o loading específico
    }
  }, []);


  // --- Effect to automatically fetch the user's current board ---
  useEffect(() => {
    if (isAuthenticated && currentUserBoardId) {
      fetchBoardById(currentUserBoardId);
    } else {
      // If user logs out or has no currentBoard set, clear the board state
      setBoard(null);
      setUserBoardError(null);     // Limpa erro específico
      setIsLoadingUserBoard(false);
    }
    // Dependency: Fetch whenever the user's current board ID changes or auth status changes
  }, [isAuthenticated, currentUserBoardId, fetchBoardById]);

  return(
    <BoardContext.Provider value={{
      board,
      setBoard,
      categorizedBoards,
      fetchCategorizedBoards,
      isLoadingUserBoard, // Loading específico para o board do usuário
      userBoardError,     // Erro específico para o board do usuário
      isLoadingCategorized, // Loading específico para categorias
      categorizedError      // Erro específico para categorias
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