import React from "react"
import "./Homepage.css"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material"
import backgroundImg from "../../assets/images/mountain.jpg"

export default function Homepage() {
  return (
    <Container maxWidth="false" disableGutters>
      <Box
        sx={{
          width: "100%",
          minHeight: "80vh",
          backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: "white", textAlign: "center", marginBottom: "2rem" }}
        >
          Find the right service, right away
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search for services..."
            fullWidth
            size="small"
            sx={{
              marginRight: "1rem",
              width: "1000px",
              backgroundColor: "white",
              color: "black",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "white",
                  opacity: 0.9,
                },
              }}
            >
              Suggestion 1
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "white",
                  opacity: 0.9,
                },
              }}
            >
              Suggestion 2
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "white",
                  opacity: 0.9,
                },
              }}
            >
              Suggestion 3
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ textAlign: "start" }}
        >
          Popular Services
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {Array.from({ length: 6 }, (_, i) => (
            <Grid item xs={12} sm={4} md={4} key={i}>
              <Card>
                <CardHeader title={`Service ${i + 1}`} />
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/150"
                  alt={`Service ${i + 1}`}
                />
                <CardContent>
                  <Typography variant="body1">Avg. cost: $100</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ marginTop: "2rem", backgroundColor: "#f5f5f5" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "start" }}>
              What JobGenius Offers
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: "start" }}>
              JobGenius is a multi-service marketplace platform that connects
              service providers with customers seeking various services. Service
              providers can create profiles, list their offerings, and manage
              bookings, while customers can browse, search, and contact
              providers directly to request their services.
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: "start" }}>
              The platform streamlines the process of finding, comparing, and
              booking various services for customers, providing service
              providers with an efficient way to showcase and manage their
              business online.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              src="https://via.placeholder.com/300"
              alt="JobGenius Features"
              width="100%"
              style={{ maxWidth: "500px" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
