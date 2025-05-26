import React from "react";
import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useRecording } from "../context/recordingContext/useRecording";
const Timer = () => {
  const { recordingStatus } = useRecording();
  const [time, setTime] = useState(new moment("00:00:00", "HH:mm:ss"));

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(prev => moment(prev).add(1, "second"));
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  if (recordingStatus === "inactive") {
    clearInterval(intervalRef.current);
    // return null; // Don't render anything if recording is inactive
  }

  return (
    <Typography variant="h6" component="span" color="text.light" backgroundColor="text.recording" borderRadius={"999px"} padding={1}>
      Time: {time.format("HH:mm:ss")}
    </Typography>
  );
};

export default Timer;
