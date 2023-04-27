import React from "react"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", color: "black" }}
    >
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6">JobGenius</Typography>
        </Box>
        <Button color="inherit">Services</Button>
        <Button color="inherit">Login/Signup</Button>
      </Toolbar>
    </AppBar>
  )
}
