import React, { createContext, useState } from 'react';
import * as authService from 'src/features/auth/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const { user, token } = await authService.login(credentials);
    setUser(user);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
