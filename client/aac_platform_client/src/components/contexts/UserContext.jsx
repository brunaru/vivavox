import { createContext, useContext, useState, useCallback } from "react";
import api from "../../services/api";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [token, setToken] = useState(null);

  const signUpUser = useCallback(async (newUser) => {
    if(!newUser) {
      console.warn("signUpUser called without an user.");
      return; 
    }

    try {
      const defaultBoardName = "Padrão 1";
      let defaultBoardId = null;

      try {
        console.log(`Attempting to fetch board ID for: ${defaultBoardName}`);
        const boardResponse = await api.get(`/board/get/${defaultBoardName}`);

        console.log(boardResponse.data);

        if (boardResponse.data && boardResponse.data._id) {
          defaultBoardId = boardResponse.data._id;
          console.log(`Successfully fetched board ID: ${defaultBoardId}`);
        } else {
          throw new Error(`Board "${defaultBoardName}" found but ID is missing.`);
        }
      } catch (boardError) {
        console.error(`Failed to fetch default board "${defaultBoardName}":`, boardError.response?.data?.message || boardError.message);
        throw new Error(`Could not find the required default board "${defaultBoardName}". Signup aborted.`);
      }

      const userDataToSend = {
        ...newUser, 
        currentBoard: defaultBoardId 
      };

      await api.post(`/user/post`, userDataToSend); 
    } catch (err) {
      console.error("UserContext: Error during sign up process:", err.response?.data || err.message || err);
      setUser(null); 
      throw err;
    }
  }, []);

  const signInUser = useCallback(async (loginData) => {
    if(!loginData) {
      console.warn("signInUser called without login data.");
      return; 
    }

    try {
      const response = await api.post(`/user/login`, loginData); 

      if(response.data.token) {
        setToken(response.data.token);
      } else {
        console.log("Received no token from api.");
      }
    } catch (err) {
      console.error("UserContext: Error during login:", err);
      setUser(null); 
      setToken(null);
      throw err;
    }
  }, []);

  const fetchUser = useCallback(async (email) => {
    if(!email) {
      console.warn("fetchUser called without an email.");
      return; 
    }

    try {
      const response = await api.get(`/user/get/${email}`); 
  
      setUser({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        currentBoard: response.data.currentBoard
      });
    } catch (err) {
      console.error("UserContext: Error searching for user:", err);
      setUser(null); 
    }
  }, []);

  return (
    <UserContext.Provider value={{
      token,
      signUpUser,
      signInUser
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if(context === undefined) {
    throw new Error('useUSer must be used within a UserProvider');
  }
  return context;
}