import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(
    Boolean(localStorage.getItem('login'))
  );

  const login = () => {
    localStorage.setItem('login', true);
    setisLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('login');
    setisLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
