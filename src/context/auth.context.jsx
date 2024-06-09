import React from "react";
import { useState, useEffect } from "react";
import authService from "../../services/auth.service";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] =useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = () => {
    
    const storedToken = localStorage.getItem('authToken');

    if(storedToken) {
      authService
        .verify()
        .then((res) => {
          const user = res.data;

          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        })
    }
    else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }

  const removeToken = () => {
    localStorage.removeItem('authToken');
  }

  const logoutUser = () => {
    removeToken();
    authenticateUser();
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        storeToken,
        authenticateUser,
        logoutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, AuthContext};