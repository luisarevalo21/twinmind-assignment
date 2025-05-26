import React from "react";

import { Box, Typography } from "@mui/material";
import moment from "moment";
const MemoriesCard = ({ memoires, handleMemoryClicked }) => {
  const date = new moment(memoires.date);

  return (
    <Box
      width={"100%"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={2}
      boxShadow={3}
      mb={3}
      py={4}
      bgcolor="background.paper"
      onClick={() => handleMemoryClicked(memoires)}
      position={"relative"}
    >
      <Typography variant="p" color="textSecondary" ml={2}>
        {date.format("h:mm a")}
      </Typography>

      <Box display={"flex"} flex={1}>
        <Typography variant="subtitle1" color="textSecondary" position={"absolute"} top={0} left={10}>
          {date.format("ddd, MMM DD")}
        </Typography>

        <Typography variant="h6" color="text.primary" textAlign={"left"} ml={2}>
          {memoires.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default MemoriesCard;
