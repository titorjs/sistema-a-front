// src/context/AuthProvider.js
import { createContext, useContext, useEffect, useState } from 'react';
import { keycloak, initKeycloak } from '../api/keycloack';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    initKeycloak()
      .then(() => {
        const nuevoToken = keycloak.token;
        localStorage.setItem('username', keycloak.tokenParsed?.preferred_username || '');
        localStorage.setItem('email', keycloak.tokenParsed?.email || '');

        setToken(nuevoToken);
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
        setToken(null);
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    setToken(null);
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <AuthContext.Provider value={{ authenticated, token, keycloak, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
