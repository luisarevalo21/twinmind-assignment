import React, { useState, useEffect, memo } from "react";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../../api";
import { useAuth } from "../../context/authContext/useAuth";
import Spinner from "../Spinner";
const PromptModal = ({ handleToggleModal, open, memoryId }) => {
  const [text, setText] = useState("");
  const [returnedResponse, setReturnedResponse] = useState(null);
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const handleTextChange = e => {
    setText(e.target.value);
  };
  const handleSend = async () => {
    try {
      setLoading(true);
      if (text !== "") {
        const trimmedText = text.trim();
        const response = await api.post("/api/memory/new-prompt", { text: trimmedText, memoryId, userId: currentUser.uid });
        setReturnedResponse(response.data);
        setText("");
      }
    } catch (error) {
      console.error("Error sending prompt:", error);
    } finally {
      setLoading(false);
      setText("");
    }
  };

  let returnedRes = null;
  if (returnedResponse) {
    console.log("return eresponse", returnedResponse);
    const { summary } = returnedResponse;
    returnedRes = (
      <Box display={"flex"} flexDirection={"column"} textAlign={"left"} mt={2} mb={2} overflow={"scroll"} maxHeight={"60vh"}>
        <Box textAlign={"left"} mb={2}>
          <Typography variant="h4">tl;dr</Typography>
          <Typography variant="p"> {summary["tl;dr"]}</Typography>
        </Box>
        <Box textAlign={"left"} mb={2}>
          <Typography variant="h4">Transcript Analysis</Typography>
          <Typography variant="p"> {summary.transcript_analysis}</Typography>
        </Box>
        <Box textAlign={"left"} mb={2}>
          <Typography variant="h4">Context Information</Typography>
          <Typography variant="p"> {summary["transcript_analysis"]}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Modal open={open} onClose={handleToggleModal}>
      <Box
        backgroundColor="primary"
        p={2}
        borderRadius={2}
        boxShadow={3}
        textAlign={"center"}
        maxWidth={600}
        mx="auto"
        mt={10}
        position="relative"
        bgcolor={"background.paper"}
        height={"100%"}
      >
        <Button
          onClick={handleToggleModal}
          sx={{ position: "absolute", top: 0, left: 0, zIndex: 999, p: "0", margin: "0", justifyContent: "flex-start" }}
        >
          <CloseIcon color="primary" />
        </Button>

        <TextField
          fullWidth
          placeholder="Ask anything about this transcitp..."
          onChange={handleTextChange}
          value={text}
          sx={{
            border: "none",
            mt: "1em",
            outline: "none",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "none" },
            },
            outline: "none",
          }}
        />
        <Button onClick={handleSend}>send</Button>

        {loading && <Spinner />}
        {returnedResponse && returnedRes}

        {/* <Box> recomemnedations here</Box> */}
      </Box>
    </Modal>
  );
};

export default PromptModal;
