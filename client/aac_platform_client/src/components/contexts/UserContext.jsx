import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../../services/api";
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on initial mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        // Decode token to get user info (basic validation)
        // For real security, you might want to verify the token signature
        // or make a quick API call to validate it on the backend if needed.
        const decodedUser = jwtDecode(storedToken); // Make sure token has user details

        // Optional: Check token expiration
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp < currentTime) {
          console.log("Token expired");
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
        } else {
          console.log("Restoring session from localStorage");
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
        console.error("Error decoding token from localStorage:", error);
        localStorage.removeItem('authToken'); // Remove invalid token
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false); // Finished initial check
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

      await api.post(`/user/post`, userDataToSend); 
    } catch (err) {
      console.error("UserContext: Error during sign up process:", err.response?.data || err.message || err);
      setUser(null); 
      throw err;
    }
  }, []);

  // Login function:
  const signInUser = useCallback(async (loginData) => {
    try {
      const response = await api.post('/user/login', loginData); // Use your actual API endpoint

      const { token: receivedToken, message } = response.data; // Get token from response

      if (receivedToken) {
        const decodedUser = jwtDecode(receivedToken); // Decode to get user info

        localStorage.setItem('authToken', receivedToken); // *** STORE TOKEN ***
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
         // Handle case where backend sends 200 but no token (shouldn't happen with your code)
         throw new Error("Login successful but no token received.");
      }

    } catch (error) {
      console.error("Error during sign in:", error);
      // Clear any potentially stale auth state
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
      // Re-throw the error so the LoginForm component can catch it and display message
      throw error;
    }
  }, []);

  // Logout function
  const signOutUser = () => {
    console.log("Signing out");
    localStorage.removeItem('authToken'); // *** REMOVE TOKEN ***
    setToken(null);
    setUser(null);
    // Remove default header
    delete api.defaults.headers.common['Authorization'];
    // Optional: Redirect to login page or home page
    // window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{
      token,
      user,
      isAuthenticated: !!token,
      loading,
      signUpUser,
      signInUser,
      signOutUser
    }}>
      {!loading && children}
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