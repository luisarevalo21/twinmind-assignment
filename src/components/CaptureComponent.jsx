import React, { useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { useLocation, useNavigate } from "react-router";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useRecording } from "../context/recordingContext/useRecording";
const CaptureComponet = ({ handleStopRecording, disabled, handleTextFieldClick, startRecording }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const { recordingStatus, setRecordingStatus } = useRecording();
  // const handleChange = e => {
  //   console.log(e.target.value);
  // };

  const handleToggleModal = () => {
    setOpen(!open);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={2}
      width="95%"
      position="fixed"
      bottom={0}
      left={0}
      zIndex={1300}
      bgcolor="background.paper"
      boxShadow={3}
    >
      <TextField
        placeholder="type your memory"
        sx={{ borderRadius: "999px", border: "0", outline: "0", backgroundColor: "text" }}
        onClick={handleTextFieldClick}
        fullWidth
      />

      {recordingStatus !== "active" && !disabled && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "999px",
            height: "100%",
            marginLeft: 2,
            paddingLeft: 3,
            paddingRight: 3,
            textTransform: "none",
          }}
          onClick={() => {
            if (location.pathname === "/new-memory") {
              startRecording();
            } else {
              navigate("/new-memory");
            }
          }}
        >
          <MicIcon />
          Capture
        </Button>
      )}

      {recordingStatus === "active" && !disabled && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "999px",
            height: "100%",
            marginLeft: 2,
            paddingLeft: 3,
            paddingRight: 3,
            textTransform: "none",
          }}
          onClick={handleStopRecording}
        >
          <StopCircleIcon />
          Stop
        </Button>
      )}
    </Box>
  );
};

export default CaptureComponet;
