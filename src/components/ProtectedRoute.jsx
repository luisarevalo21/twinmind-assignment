import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/authContext/useAuth";
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return children;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;
