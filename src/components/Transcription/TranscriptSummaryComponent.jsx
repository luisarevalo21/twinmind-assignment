import React from "react";
import { Box, Typography } from "@mui/material";
import Spinner from "../Spinner";
const TranscriptSummary = ({ summary, showSpinner }) => {
  if (showSpinner) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Spinner />
        Generating summary...
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="body1" color="text.secondary">
        {summary ? summary : "No summary available."}
      </Typography>
    </Box>
  );
};

export default TranscriptSummary;
