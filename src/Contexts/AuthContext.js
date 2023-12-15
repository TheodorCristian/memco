// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  login as loginAPI,
  signout as signoutAPI,
} from "../Actions/AuthAction"; // Import login function from AuthActions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userToken = await loginAPI(email, password); // Using login function from AuthActions
      setUser(userToken.data);
      return userToken;
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setLoading(true);
    try {
      const signoutResponse = await signoutAPI(); // Using signout function from AuthActions
      setUser(null);
      return signoutResponse;
    } catch (error) {
      console.error("Signout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
