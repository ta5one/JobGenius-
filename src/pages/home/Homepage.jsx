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
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Avatar,
} from "@mui/material"

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
          sx={{
            color: "white",
            textAlign: "center",
            marginBottom: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
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
            size="small"
            sx={{
              marginRight: "1rem",
              width: "1000px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
              "& .MuiOutlinedInput-input": {
                color: "black",
                padding: "10px",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": {
                backgroundColor: "#8dfc8f",
              },
            }}
          >
            Search
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              paddingBottom: "16px",
              marginRight: "16px",
            }}
          >
            <Grid item xs={12} sm={2}>
              <Typography
                fontSize={"16px"}
                align="right"
                sx={{ color: "#black" }}
              >
                Recent:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="text"
                color="primary"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "0 10px 0 10px",
                  "&:hover": {
                    backgroundColor: "white",
                    opacity: 0.9,
                  },
                }}
              >
                Suggestion1
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="text"
                color="primary"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "0 10px 0 10px",
                  "&:hover": {
                    backgroundColor: "white",
                    opacity: 0.9,
                  },
                }}
              >
                Suggestion2
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="text"
                color="primary"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "0 10px 0 10px",
                  "&:hover": {
                    backgroundColor: "white",
                    opacity: 0.9,
                  },
                }}
              >
                Suggestion3
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "2rem",
          padding: "20px",
          marginRight: "-10px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Popular Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {Array.from({ length: 6 }, (_, i) => (
            <Grid item xs={12} sm={4} md={4} key={i}>
              <Card>
                <CardHeader title={`Service ${i + 1}`} />
                <CardMedia
                  sx={{ marginLeft: "0px" }}
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
      <Box
        sx={{ marginTop: "2rem", backgroundColor: "#f5f5f5", padding: "20px" }}
      >
        <Grid container spacing={2} justifyContent="space-between">
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
          <Grid item xs={12} sm={4}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/YA400nwQhLE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: "2rem", marginBottom: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Customer Reviews
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {Array.from({ length: 3 }, (_, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      src={`https://via.placeholder.com/150?text=Avatar+${
                        i + 1
                      }`}
                      alt={`Reviewer ${i + 1}`}
                    />
                  }
                  title={`Reviewer ${i + 1}`}
                />
                <CardContent>
                  <Rating value={5} readOnly />
                  <Typography variant="body1">
                    My experience with JobGenius was fantastic! I found the
                    perfect service provider for my needs and the whole process
                    was smooth and hassle-free. I highly recommend JobGenius to
                    anyone looking for quality services.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
