import React from "react"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  console.log("isAuthenticated:", isAuthenticated)

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", color: "black" }}
    >
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6">JobGenius</Typography>
        </Box>
        {isAuthenticated ? (
          <>
            <Button color="inherit">Add a Service</Button>
            <Button color="inherit">Services</Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
            <Typography variant="subtitle1">
              Hello, {user && user.first_name} {user && user.last_name}
            </Typography>
          </>
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button color="inherit">Login/Signup</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )
}
