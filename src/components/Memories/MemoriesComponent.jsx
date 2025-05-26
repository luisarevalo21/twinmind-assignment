import React from "react";

import { Box, Typography } from "@mui/material";
import MemoriesCard from "./MemoriesCard";
const MemoriesComponent = ({ memories, handleMemoryClicked }) => {
  if (!memories || memories.length === 0) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h6" color="textSecondary">
          No memories available.
        </Typography>
      </Box>
    );
  }
  const memoriesCards = memories.map(memory => <MemoriesCard key={memory.memoryId} memoires={memory} handleMemoryClicked={handleMemoryClicked} />);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {memoriesCards}
    </Box>
  );
};

export default MemoriesComponent;
