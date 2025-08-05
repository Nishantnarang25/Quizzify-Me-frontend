import { createContext, useContext, useState, useEffect  } from "react";

// createContext - this helps us to create a box where we wrap the AuthProvider
// Create a context (like a shared box)
const AuthContext = createContext();

// Provider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in any component
export const useAuth = () => useContext(AuthContext);

//Basically we are fetching th user using localStorage.getItem("user");
//Usually the user = null, but we check if there is no user in local storage
//and if there is a user,  if (storedUser) {
//    setUser(JSON.parse(storedUser));
//  }