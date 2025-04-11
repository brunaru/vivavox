import { createContext, useContext, useState } from "react";

const BoardContext = createContext();

export function BoardContextProvider({ children }) {
  const [board, setBoard] = useState({});

  return(
    <BoardContext.Provider value={{
      board,
      setBoard
    }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  return useContext(BoardContext);
}