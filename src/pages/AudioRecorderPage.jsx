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
  const memoryIdRef = useRef(null);
  const manualOffload = useRef(false);
  const audioChunksRef = useRef([]);
  const [generatedSummary, setGeneratedSummary] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const chunkDuration = 3000;
  const chunkInterval = useRef(null);
  const activeRecorders = useRef([]);
  const mediaRecorder = useRef(null);
  const [memoryId, setMemoryId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState(null);
  const handleMemoryTitleChange = e => {
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

    if (audioChunksRef.current.length === 0) {
      console.warn("No audio chunks to summarize.");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("audio", new Blob(audioChunksRef.current, { type: mimeType }), `recording_${Date.now()}.webm`);
      formData.append("memoryId", memoryIdRef.current || "");
      const response = await api.post("/api/memories/new-summary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setGeneratedSummary(response.data.text);
    } catch (error) {
      console.error("Error getting summary:", error);
      setError(error.message);
    } finally {
      setAudioChunks([]);
      setAudio(null);
      audioChunksRef.current = [];
    }

    setShowSpinner(false);
  };

  const sendChunksToBackend = async audioBlob => {
    if (!audioBlob) return;

    const formdata = new FormData();
    formdata.append("audio", audioBlob, `recording_${Date.now()}.webm`);
    formdata.append("userId", currentUser.uid);
    formdata.append("memoryId", memoryIdRef.current || ""); // Use existing memoryId or empty string
    formdata.append("memoryTitle", memoryTitle || "Untitled Memory");
    try {
      const response = await api.post("/api/memories/new-audio", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      memoryIdRef.current = response.data.memoryId;
      setAudioTranscript(prev => [...prev, response.data.text]);
      setMemoryId(response.data.memoryId);
      setMemoryTitle(response.data.memoryTitle);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const recordChunk = stream => {
    if (!stream || recordingStatusRef.current !== "active") return;
    const media = new MediaRecorder(stream, { type: mimeType });

    mediaRecorder.current = media;
    activeRecorders.current.push(media);
    let localAudioChunks = [];
    media.ondataavailable = event => {
      if (event.data && event.data.size > 0) {
        localAudioChunks.push(event.data);
        setAudioChunks(prev => [...prev, event.data]);
        audioChunksRef.current.push(event.data);
      }
    };
    media.onstop = () => {
      if (manualOffload.current) {
        getSummary();
        manualOffload.current = false;
      } else {
        const audioBlob = new Blob(localAudioChunks, { type: mimeType });
        sendChunksToBackend(audioBlob);
      }
    };
    media.start();
    setTimeout(() => {
      if (media.state === "recording") {
        media.stop();
      }
    }, chunkDuration);
  };
  const startRecording = async () => {
    try {
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
    manualOffload.current = true;
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
    setTabValue(1);
    setStream(null);
  };

  return (
    <Box>
      <TextField
        placeholder="untitled memory"
        onChange={e => handleMemoryTitleChange(e)}
        value={memoryTitle}
        variant="outlined"
        fullWidth
      ></TextField>

      <TranscriptComponent
        recordingStatus={recordingStatus}
        audio={audio}
        audioTranscript={audioTranscript}
        generatedSummary={generatedSummary}
        error={error}
        showSpinner={showSpinner}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />

      <CaptureComponet handleStopRecording={stopRecording} startRecording={startRecording} disabled={false}></CaptureComponet>
    </Box>
  );
};

export default RecordAudio;
