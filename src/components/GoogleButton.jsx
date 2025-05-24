import React from "react";

import GoogleButton from "react-google-button";
import { useAuth } from "../context/authContext/useAuth";
import { signInWithGoogle } from "../config/auth";
import { useNavigate } from "react-router";

const GoogleButtonComponent = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async e => {
    e.preventDefault();
    signInWithGoogle()
      .then(result => {
        navigate("/dashboard");
        console.log(result);
      })
      .catch(error => {
        console.error("Error signing in with Google: ", error);
      });
  };
  return <GoogleButton onClick={handleLogin} />;
};

export default GoogleButtonComponent;
