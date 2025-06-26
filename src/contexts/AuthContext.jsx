import React, { createContext, useState, useContext, useEffect } from 'react';
import { isLoggedIn as checkLogin, login as doLogin, logout as doLogout } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkLogin());

  useEffect(() => {
    setIsLoggedIn(checkLogin());
  }, []);

  const login = () => {
    doLogin();
    setIsLoggedIn(true);
  };

  const logout = () => {
    doLogout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
