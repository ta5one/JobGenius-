import React from "react"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"

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
        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          <Button color="inherit">Login/Signup</Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
