import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import TranscriptSummary from "../components/Transcription/TranscriptSummaryComponent";
import TranscriptComponent from "../components/Transcription/TranscriptComponent";
import Spinner from "../components/Spinner";
import { api } from "../api";
import PromptModal from "../components/PromptModal/PromptModal";
import CaptureComponet from "../components/CaptureComponent";
const MemoryDetails = () => {
  const { memoryId } = useParams();
  const [memoryDetails, setMemoryDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  useEffect(() => {
    const fetchMemoryDetails = async () => {
      try {
        setLoading(true);
        // Replace with your API call to fetch memory details
        const response = await api(`/api/memory/details/${memoryId}`);

        setMemoryDetails(response.data);
        setLoading(false);
      } catch (error) {
        throw new Error("Failed to fetch memory details");
      } finally {
        setLoading(false);
      }
    };
    fetchMemoryDetails();
  }, []);

  const handleTextFieldClick = () => {
    setOpen(!open);
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <Box>
      <TranscriptComponent
        tabValue={tabValue}
        audioTranscript={memoryDetails.transcript}
        generatedSummary={memoryDetails.summary}
        setTabValue={setTabValue}
      />
      {open && <PromptModal open={open} handleToggleModal={handleTextFieldClick} memoryId={memoryId} />}
      <CaptureComponet disabled={true} handleTextFieldClick={handleTextFieldClick} />
    </Box>
  );
};

export default MemoryDetails;
