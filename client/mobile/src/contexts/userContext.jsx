import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { storage } from "../storage";
import  api  from "../services/api.js";
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = () => {
        const storedToken = storage.getString('authToken');
        if (storedToken) {
        try {
            // Decode token to get user info (basic validation)
            // For real security, you might want to verify the token signature
            // or make a quick API call to validate it on the backend if needed.
            const decodedUser = jwtDecode(storedToken); // Make sure token has user details

            const currentTime = Date.now() / 1000;
            if (decodedUser.exp && decodedUser.exp < currentTime) {
              console.log("Token expired");
              storage.remove('authToken');
              setToken(null);
              setUser(null);
            } else {
                console.log("Restoring session from storage");
                setToken(storedToken);
                // Extract user details from the decoded token (adjust based on your token payload)
                setUser({
                    _id: decodedUser._id,
                    name: decodedUser.name,
                    email: decodedUser.email,
                    type: decodedUser.type,
                    currentBoard: decodedUser.currentBoard // Assuming these are in the token
                });
                // Also configure your api instance to use this token by default
                api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
              }
        } catch (error) {
            console.error("Error decoding token from storage:", error);
           storage.remove('authToken'); // Remove invalid token
            setToken(null);
            setUser(null);
        }
        }
        setLoading(false); 
        }
    loadToken();
  }, []);

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

     const response = await api.post(`/user/post`, userDataToSend); 
     return response;
    } catch (err) {
      console.error("UserContext: Error during sign up process:", err.response?.data || err.message || err);
      setUser(null); 
      throw err;
    }
  }, []);

  // Login function:
  const signInUser = useCallback(async (loginData) => {
    try {
      const response = await api.post('/user/login', loginData); 
      const { token: receivedToken, message } = response.data; // Get token from response
      
      if (receivedToken) {
        const decodedUser = jwtDecode(receivedToken); 

       storage.set('authToken', receivedToken); 
        setToken(receivedToken);
        setUser({
            _id: decodedUser._id,
            name: decodedUser.name,
            email: decodedUser.email,
            type: decodedUser.type,
            currentBoard: decodedUser.currentBoard
         });
        // Set default header for subsequent API calls in this session
        api.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;
        console.log(message || "Login successful");
        // No need to return anything specific unless your component needs it
      } else {
         throw new Error("Login successful but no token received.");
      }

    } catch (error) {      // Clear any potentially stale auth state
     storage.remove('authToken');
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
      throw error;
    }
  }, []);

  // Logout function
  const signOutUser = () => {
    console.log("Signing out");
     storage.remove('authToken'); 
    setToken(null);
    setUser(null);
    // Remove default header
    delete api.defaults.headers.common['Authorization'];
  };

  const updateCurrentBoard = async (newCurrentBoard) => {
    if (!newCurrentBoard?._id) { 
      console.warn("updateCurrentBoard chamado sem um newCurrentBoard válido com _id.");
      return;
    }
    if (!user?._id) { 
      console.warn("updateCurrentBoard chamado quando o usuário não está carregado ou não tem _id.");
      return;
    }

    const newBoardId = newCurrentBoard._id;
    const userId = user._id;

    
    const updatePayload = {
      currentBoard: newBoardId
    };

    const updatedUserObject = {
        ...user, 
        currentBoard: newBoardId 
    };
    setUser(updatedUserObject); 

    try {
      const response = await api.patch(`/user/update/${userId}`, updatePayload); 
      console.log("Current board update successful on backend:", response.data.message);

      if (response.data && response.data.token) {
          const receivedToken = response.data.token;
          const decodedUser = jwtDecode(receivedToken); 

         storage.set('authToken', receivedToken); 
          setToken(receivedToken); 

           setUser({
              _id: decodedUser._id,
              name: decodedUser.name,
              email: decodedUser.email,
              type: decodedUser.type,
              currentBoard: decodedUser.currentBoard 
           });
           api.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;

      } else {
         console.warn("Backend did not return a new token after update. Refresh might revert currentBoard.");
      }

    } catch (error) {
      console.error("Error updating current board on backend:", error.response?.data || error.message);
    }
  } 

  if (loading) return null;

  return (
    <UserContext.Provider value={{
      token,
      user,
      isAuthenticated: !!user,
      loading,
      signUpUser,
      signInUser,
      signOutUser,
      updateCurrentBoard
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if(context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}