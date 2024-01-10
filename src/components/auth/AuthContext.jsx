import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const [isLogin, setIsLogin] = useState(storedUser);
  useEffect(() => {
    if (storedUser) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <>
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
          {children}
        </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);