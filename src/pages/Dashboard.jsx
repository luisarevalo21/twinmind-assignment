import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../context/authContext/useAuth";
import CaptureComponet from "../components/CaptureComponent";
const Dashboard = () => {
  const { currentUser } = useAuth();

  const [usersMemories, setUsersMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/memories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch memories");
        }
        const data = await response.json();
        setUsersMemories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    // fetchMemories();
  }, []);
  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Twinmind Dashboasrd
      </Typography>

      <CaptureComponet recordingStatus={"inactive"} />

      {/* {currentUser && <Button onClick={() => signOut()}>Logout</Button>} */}
    </Box>
  );
};

export default Dashboard;
