import React from "react"
import { Box, Typography } from "@mui/material"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80px",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        marginTop: "auto",
        backgroundColor: "white",
      }}
    >
      <Typography variant="body1">
        &copy; {currentYear} Mohammed T Ali. All Rights Reserved.
      </Typography>
    </Box>
  )
}
