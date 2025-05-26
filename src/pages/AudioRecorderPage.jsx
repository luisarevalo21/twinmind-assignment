import React from "react";
import { useState, useEffect, useRef } from "react";
import CaptureComponet from "../components/CaptureComponent";
import { Box, Button, TextField, Typography } from "@mui/material";
import { api } from "../api/index";
import TranscriptComponent from "../components/Transcription/TranscriptComponent";
import { useRecording } from "../context/recordingContext/useRecording";
import { useAuth } from "../context/authContext/useAuth";
const mimeType = "audio/webm";
const RecordAudio = () => {
  const { recordingStatus, setRecordingStatus } = useRecording();
  const { currentUser } = useAuth();
  const recordingStatusRef = useRef(recordingStatus);
  const [memoryTitle, setMemoryTitle] = useState("");
  const [audioTranscript, setAudioTranscript] = useState([]);
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const [generatedSummary, setGeneratedSummary] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const chunkDuration = 5000; // 5 seconds
  const chunkInterval = useRef(null);
  const activeRecorders = useRef([]);
  const mediaRecorder = useRef(null);
  const [memoryId, setMemoryId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const handleMemoryTitleChange = e => {
    console.log("Memory title changed:", e.target.value);
    setMemoryTitle(e.target.value);
  };
  useEffect(() => {
    recordingStatusRef.current = recordingStatus;
    return () => {
      if (recordingStatus === "active") {
        stopRecording();
      }
    };
  }, [recordingStatus]);

  const getSummary = async () => {
    setShowSpinner(true);
    if (audioChunks.length === 0) {
      console.warn("No audio chunks to summarize.");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("audio", new Blob(audioChunks, { type: mimeType }), `recording_${Date.now()}.webm`);
      formData.append("memoryId", memoryId || ""); // Use existing memoryId or empty string
      const response = await api.post("/api/memories/new-summary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Summary response:", response.data);
      setGeneratedSummary(response.data.text);
    } catch (error) {
      console.error("Error getting summary:", error);
      return;
    } finally {
      setAudioChunks([]);
      setAudio(null);
    }

    setShowSpinner(false);
  };

  const sendChunksToBackend = async audioBlob => {
    if (!audioBlob) return;
    console.log("Sending audio blob to backend:", audioBlob);

    const formdata = new FormData();
    formdata.append("audio", audioBlob, `recording_${Date.now()}.webm`);
    formdata.append("userId", currentUser.uid);
    formdata.append("memoryId", memoryId || ""); // Use existing memoryId or empty string

    try {
      const response = await api.post("/api/memories/new-audio", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAudioTranscript(prev => [...prev, response.data.text]);
      setMemoryId(response.data.memoryId);
      setMemoryTitle(response.data.title);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const recordChunk = stream => {
    console.log("recording chunk", stream);
    if (!stream || recordingStatusRef.current !== "active") return;
    const media = new MediaRecorder(stream, { type: mimeType });

    console.log("recording chunk");
    mediaRecorder.current = media;
    activeRecorders.current.push(media);
    let localAudioChunks = [];
    media.ondataavailable = event => {
      if (event.data && event.data.size > 0) {
        localAudioChunks.push(event.data);
        setAudioChunks(prev => [...prev, event.data]);
      }
    };
    media.onstop = () => {
      const audioBlob = new Blob(localAudioChunks, { type: mimeType });
      sendChunksToBackend(audioBlob);
    };
    media.start();
    setTimeout(() => {
      if (media.state === "recording") {
        media.stop();
      }
    }, chunkDuration);
  };
  const startRecording = async () => {
    console.log("start called");

    try {
      recordChunk();
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(mediaStream);
      setRecordingStatus("active");
      recordChunk(mediaStream);
      chunkInterval.current = setInterval(() => {
        if (recordingStatusRef.current === "active") {
          recordChunk(mediaStream);
        } else {
          clearInterval(chunkInterval.current);
          chunkInterval.current = null;
        }
      }, chunkDuration);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    if (chunkInterval.current) {
      clearInterval(chunkInterval.current);
      chunkInterval.current = null;
    }
    activeRecorders.current.forEach(recorder => {
      if (recorder && recorder.state === "recording") {
        recorder.stop();
      }
    });
    activeRecorders.current = [];
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    getSummary();
    setTabValue(1);
    setStream(null);
  };

  return (
    <Box>
      <TextField placeholder="untitle memory" onChange={e => handleMemoryTitleChange(e)} value={memoryTitle} variant="outlined" fullWidth></TextField>

      <TranscriptComponent
        recordingStatus={recordingStatus}
        audio={audio}
        audioTranscript={audioTranscript}
        generatedSummary={generatedSummary}
        showSpinner={showSpinner}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />

      <CaptureComponet handleStopRecording={stopRecording} startRecording={startRecording} disabled={false}></CaptureComponet>
    </Box>
  );
};

export default RecordAudio;
