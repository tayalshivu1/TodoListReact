import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(
    Boolean(localStorage.getItem("token")),
  );

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setisLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setisLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
