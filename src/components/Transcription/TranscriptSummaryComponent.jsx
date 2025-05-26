import React from "react";
import { Box, Typography } from "@mui/material";
import Spinner from "../Spinner";
const TranscriptSummary = ({ summary, showSpinner }) => {
  if (showSpinner) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection={"column"}>
        Generating summary...
        <Spinner />
      </Box>
    );
  }
  if (!summary || Object.keys(summary).length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography variant="body1">No summary available.</Typography>
      </Box>
    );
  }
  return (
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
};

export default TranscriptSummary;
