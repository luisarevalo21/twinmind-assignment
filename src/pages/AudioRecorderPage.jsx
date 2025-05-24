import React from "react";
import { useState, useEffect, useRef } from "react";
const mimeType = "audio/webm";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CaptureComponet from "../components/CaptureComponent";
import { Box, Button, Typography } from "@mui/material";
import { api } from "../api/index";
const RecordAudio = () => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      getMicrophonePermission();
    };
    getPermission();
  }, []);
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setRecordingStatus("active");
        setPermission(true);
        setStream(streamData);
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(streamData, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = event => {
          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
        setRecordingStatus("active");
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
      setAudio(false);
      setAudioChunks([]);
      setStream(null);
      setPermission(false);
    }
  };

  const handleStopRecording = async () => {
    console.log("stopping recording");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      setRecordingStatus("inactive");

      const formdata = new FormData();
      formdata.append("audio", audioBlob, "recording.webm");
      try {
        const response = await api.post("/api/memories/new-audio", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error uploading audio:", error);
      }
    };
  };
  console.log("recording", recordingStatus);
  return (
    <Box>
      <Typography>Creating new memory...</Typography>

      <CaptureComponet recordingStatus={recordingStatus} handleStopRecording={handleStopRecording} audio={audio}></CaptureComponet>
    </Box>
  );
};

export default RecordAudio;
