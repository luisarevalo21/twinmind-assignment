import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../context/authContext/useAuth";
import CaptureComponet from "../components/CaptureComponent";
import { api } from "../api";
import Spinner from "../components/Spinner";
import MemoriesComponent from "../components/Memories/MemoriesComponent";
import { useNavigate } from "react-router";
import PromptModal from "../components/PromptModal/PromptModal";
const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [usersMemories, setUsersMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [memory, setMemory] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchMemories = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get(`/api/memory/${currentUser.uid}`);
        if (!response.status || response.status !== 200) {
          throw new Error("Failed to fetch memories");
        }

        setUsersMemories(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMemories();
  }, []);

  const handleMemoryClicked = memory => {
    setMemory(memory);

    navigate(`/memory/${memory.memoryId}`, { state: { memory } });
    // Handle memory click logic here, e.g., navigate to a detail page or open a modal
  };

  const handleTextFieldClick = () => {
    setOpen(!open);
  };
  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <Typography variant="h4" gutterBottom textAlign={"center"} mt={2}>
        Memories
      </Typography>

      {open && <PromptModal open={open} handleToggleModal={() => setOpen(false)} />}

      {loading && <Spinner />}

      {!loading && <MemoriesComponent memories={usersMemories} handleMemoryClicked={handleMemoryClicked} />}

      <CaptureComponet recordingStatus={"inactive"} handleTextFieldClick={handleTextFieldClick} />

      {/* {currentUser && <Button onClick={() => signOut()}>Logout</Button>} */}
    </Box>
  );
};

export default Dashboard;
