import React, { useState, useEffect, useContext, createContext } from "react";
const RecordingContext = createContext();

export function useRecording() {
  return useContext(RecordingContext);
}
export function RecordingProvider({ children }) {
  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const value = {
    recordingStatus, // Placeholder for recording status\
    setRecordingStatus, // Placeholder function to set recording status
  };
  return <RecordingContext.Provider value={value}>{children}</RecordingContext.Provider>;
}
