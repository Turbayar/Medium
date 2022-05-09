import React from "react";
import Box from "@mui/material/Box";

function Post() {
  return (
    <Box
      sx={{
        width: "90%",
        height: 100,
        backgroundColor: "primary.dark",
        marginTop: "10px",
        margin: " 10px auto",

        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >  </Box>
  );
}

export default Post;
