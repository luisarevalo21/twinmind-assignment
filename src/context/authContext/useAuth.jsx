import React, { useState, useEffect, useContext, createContext } from "react";
const AuthContext = createContext();
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((auth, initilizeUser));

    return unsubscribe;
  }, []);

  async function initilizeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
