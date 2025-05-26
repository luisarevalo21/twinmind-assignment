import { AuthProvider } from "../context/authContext/useAuth";
import { RecordingProvider } from "../context/recordingContext/useRecording";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <RecordingProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </RecordingProvider>
    </AuthProvider>
  );
}
