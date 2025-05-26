import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // Replace with TwinMind primary brand
    primary: {
      light: "#1D5C7F", // steel blue
      main: "#004B75", // twinmind blue
      dark: "#003C64", // dark blue
      contrastText: "#FFFFFF",
    },
    // Accent colors for buttons, highlights, etc.
    secondary: {
      light: "#F7941D", // orange gradient light
      main: "#F9790B", // orange
      dark: "#cc5e07",
      contrastText: "#FFFFFF",
    },

    // Add custom grays and other tones
    background: {
      default: "#F5F5F5", // main background
      paper: "#FFFFFF", // card background
    },

    text: {
      primary: "#2C2C2E", // dark text
      secondary: "#6E6E73", // medium gray
      disabled: "#8E8E93", // light gray
      recording: "#9f0404",
    },

    // Optional: custom colors
    custom: {
      teal: "#054D4B",
      paleGray: "#D1D1D6",
      border: "#E6ECF0",
    },
  },
});

export default theme;
