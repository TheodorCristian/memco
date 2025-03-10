// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  login as loginAPI,
  signout as signoutAPI,
  verifyToken as verifyTokenAPI,
  signup as signupAPI
} from "../Actions/AuthAction"; // Import login function from AuthActions
import { saveToDB, getFromDB, clearDB } from "../Utils/indexedDB";
import Utils from "../Utils/utils";
import handleAuthChannelMessage from "../Utils/authChannelBroadcasthelper";

const AuthContext = createContext();
const authChannel = new BroadcastChannel("auth-channel");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = await getFromDB("user");
      const storedToken = await getFromDB("userToken");
      const storedRoles = await getFromDB("userRoles");
      
      if (storedUser && storedToken && storedRoles) {
        setUser(JSON.parse(storedUser));
        setToken(JSON.parse(storedToken));
        setUserRoles(JSON.parse(storedRoles));
      }

      const isValid = await verifyTokenAPI();
      if (!isValid) {
        logout(); 
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    const messageHandler = (event) => {
      handleAuthChannelMessage(event, { setUser, setToken, setUserRoles, authChannel });
    };

    authChannel.addEventListener("message", messageHandler);
    return () => authChannel.removeEventListener("message", messageHandler);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userToken = await loginAPI(email, password);
      setUser(userToken.data);
      setToken(userToken.token);

      // roles encryption // 
      let userRoles = (userToken.userData) ? userToken.userData : [];
      let encryptedUserRoles = userRoles.map(role => Utils.encryptValue(role))
      setUserRoles(encryptedUserRoles);

      // sessionStorage.setItem("user", JSON.stringify(userToken.data));
      // sessionStorage.setItem("userToken", JSON.stringify(userToken.token));
      // sessionStorage.setItem("userRoles", JSON.stringify(encryptedUserRoles));

      await saveToDB("user", JSON.stringify(userToken.data));
      await saveToDB("userToken", JSON.stringify(userToken.token));
      await saveToDB("userRoles", JSON.stringify(encryptedUserRoles));

      authChannel.postMessage({
        type: "login",
        user: userToken.data,
        token: userToken.token,
        userRoles: encryptedUserRoles,
      });

      return userToken;
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signoutAPI();
      setUser(null);
      setToken(null);
      setUserRoles([]);

      sessionStorage.clear();
      await clearDB();
      authChannel.postMessage({type: "logout"});
      return {
        isSuccess: true
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      await signupAPI(userData);
      await login(userData.email, userData.password);
    
    } catch(error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const verifyToken = async () => {
    setLoading(true);
    try {
      return await verifyTokenAPI();
    } catch(error) {
      // will return error message to create a react toaster
      console.error(error.message);
    } finally {
      setLoading(false);
    }



  }

  return (
    <AuthContext.Provider value={{ user, token, userRoles, loading, login, logout, signup, verifyToken}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
