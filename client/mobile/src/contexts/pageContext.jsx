import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export function PageContextProvider({ children }) {
  const [page, setPage] = useState("Prancha atual");

  return(
    <PageContext.Provider value={{
      page,
      setPage
    }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}