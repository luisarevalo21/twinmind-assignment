import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../context/authContext/useAuth";
import { signInWithGoogle, signOut } from "../config/auth";
import { useNavigate } from "react-router";
import { api } from "../api";
import GoogleButton from "../components/GoogleButton.jsx";
import "../index.css";
const HomePage = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
    if (currentUser) {
      localStorage.setItem("token", currentUser.accessToken);
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);
  const hanldeLogin = async e => {
    e.preventDefault();
    signInWithGoogle()
      .then(result => {
        navigate("/dashboard");
      })
      .catch(error => {
        console.error("Error signing in with Google: ", error);
      });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyItems={"center"}
      height={"100vh"}
      sx={{
        background:
          "linear-gradient(180deg, rgba(101,147,184,1) 0%, rgba(131,170,200,1) 25%, rgba(161,194,216,1) 50%, rgba(189,179,171,1) 75%, rgba(217,165,126,1) 100%)",
      }}
    >
      <Typography variant="h2" flexDirection={"flex-start"}>
        twin
      </Typography>
      <Typography variant="h2" marginLeft={1}>
        mind
      </Typography>
      <GoogleButton></GoogleButton>
      {currentUser && <Button onClick={() => signOut()}>Logout</Button>}
    </Box>
  );
};

export default HomePage;
