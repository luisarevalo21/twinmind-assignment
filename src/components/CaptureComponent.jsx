import React, { useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { useState } from "react";
import AudioRecorder from "../pages/AudioRecorderPage";
import { useNavigate } from "react-router";
const mimeType = "audio/webm";
import StopCircleIcon from "@mui/icons-material/StopCircle";

const CaptureComponet = ({ recordingStatus, handleStopRecording, audio }) => {
  const navigate = useNavigate();

  const handleChange = e => {
    console.log(e.target.value);
  };

  return (
    <Box display={"flex"} alignItems={"center"} position={"absolute"} bottom={0} justifyContent={"center"} p={2} width={"100%"}>
      <TextField
        size="lg"
        placeholder="type your memory"
        sx={{ borderRadius: "999px", border: "0", outline: "0", backgroundColor: "text" }}
        onChange={handleChange}
      />
      {recordingStatus === "inactive" && (
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
          onClick={() => navigate("/new-memory")}
        >
          <MicIcon />
          Capture
        </Button>
      )}
      {recordingStatus === "active" && (
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
          Stop Recording
        </Button>
      )}

      {audio ? (
        <div className="audio-container">
          <audio src={audio} controls></audio>
          <a download href={audio}>
            Download Recording
          </a>
        </div>
      ) : null}
    </Box>
  );
};

export default CaptureComponet;
