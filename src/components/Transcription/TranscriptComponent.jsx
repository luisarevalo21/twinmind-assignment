import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import TranscriptCardComponent from "./TranscriptCardComponent";
import TranscriptSummary from "./TranscriptSummaryComponent";
const TranscriptComponent = ({ audioTranscript, generatedSummary, showSpinner, tabValue, setTabValue }) => {
  const transcript = audioTranscript.map((transcriptedText, index) => <TranscriptCardComponent key={index} transcriptedText={transcriptedText} />);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {tabValue === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  return (
    <Box overflow-y={"scroll"} height="100%" padding={2} sx={{ backgroundColor: "background.default", overflowY: "scroll" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Transcript" />
          <Tab label="Summary" />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        {transcript.length > 0 ? (
          transcript
        ) : (
          <Typography variant="body1" color="text.secondary">
            No transcripts available.
          </Typography>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <TranscriptSummary summary={generatedSummary} showSpinner={showSpinner} />
      </CustomTabPanel>
    </Box>
  );
};

export default TranscriptComponent;
