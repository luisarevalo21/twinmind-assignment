import React from "react";
import { Box, Typography } from "@mui/material";
const TranscriptCardComponent = ({ transcriptedText }) => {
  return (
    <Box sx={{ padding: 2, backgroundColor: "background.paper", boxShadow: 3, marginBottom: 2 }}>
      <Typography variant="p">{transcriptedText}</Typography>
    </Box>
  );
};

export default TranscriptCardComponent;
