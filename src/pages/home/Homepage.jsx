import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
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

import {
  search,
  searchSuggestions,
  getCategories,
} from "../../api/searchServices"
import backgroundImg from "../../assets/images/mountain.jpg"

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [categories, setCategories] = useState([])

  const jobTypes = [
    "Plumber",
    "Electrician",
    "Carpenter",
    "Painter",
    "Mechanic",
    "Gardener",
  ]

  const imageMap = {
    Carpenter:
      "https://cdn.pixabay.com/photo/2019/02/23/07/21/carpenter-4015109_960_720.jpg",
    Plumber:
      "https://cdn.pixabay.com/photo/2017/09/26/11/10/plumber-2788329_960_720.jpg",
    Electrician:
      "https://cdn.pixabay.com/photo/2017/09/16/14/33/electrician-2755683_960_720.jpg",
    Painter:
      "https://cdn.pixabay.com/photo/2014/09/07/17/12/working-438059_960_720.jpg",
    Mechanic:
      "https://cdn.pixabay.com/photo/2018/09/20/22/23/auto-repair-3691963_960_720.jpg",
    Gardener:
      "https://cdn.pixabay.com/photo/2019/12/21/12/37/gardening-4710392_960_720.jpg",
  }

  const averageCost = {
    Plumber: 80,
    Electrician: 90,
    Carpenter: 70,
    Painter: 60,
    Mechanic: 100,
    Gardener: 50,
  }

  const navigate = useNavigate()

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return
    }

    try {
      const results = await search(searchQuery)
      setSearchResults(results)
      await fetchCategories(searchQuery)
      navigate(`/services?q=${searchQuery}`)
    } catch (error) {
      console.error("Error fetching search results:", error)
    }
  }

  const fetchSuggestions = async query => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }

    try {
      const results = await searchSuggestions(query)
      setSuggestions(results)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
    }
  }

  const fetchCategories = async searchTerm => {
    const fetchedCategories = await getCategories(searchTerm)
    setCategories(fetchedCategories)
  }

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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
              onChange={e => {
                setSearchQuery(e.target.value)
                fetchSuggestions(e.target.value)
              }}
              sx={{
                marginRight: "1rem",
                width: "1000px",
                borderBottomRightRadius: "0px",
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
              onClick={handleSearch}
              sx={{
                backgroundColor: "#4caf50",
                "&:hover": {
                  backgroundColor: "#016e03",
                },
              }}
            >
              Search
            </Button>
          </Box>
          <Box
            sx={{
              position: "relative",
              backgroundColor: "white",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
              boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
              padding: "5px",
              zIndex: 1,
              width: "982px",
              marginRight: "15.1%",
              marginTop: "-35px",
              marginBottom: "3%",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                fullWidth
                variant="text"
                color="primary"
                onClick={() => {
                  setSearchQuery(suggestion)
                  setSuggestions([])
                }}
                sx={{
                  textAlign: "left",
                  justifyContent: "flex-start",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                {suggestion.category}
              </Button>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
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
                  onClick={() => navigate("/services")}
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
                  Painter
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  fullWidth
                  variant="text"
                  color="primary"
                  onClick={() => navigate("/services")}
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
                  Carpenter
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  fullWidth
                  variant="text"
                  color="primary"
                  onClick={() => navigate("/services")}
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
                  Cleaner
                </Button>
              </Grid>
            </Grid>
          </Box>
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
                <CardHeader title={jobTypes[i]} />
                <CardMedia
                  sx={{ marginLeft: "0px" }}
                  component="img"
                  height="140"
                  image={imageMap[jobTypes[i]]}
                  alt={`Service ${i + 1}`}
                />
                <CardContent>
                  <Typography variant="body1">
                    Avg. cost: ${averageCost[jobTypes[i]]} p/hr
                  </Typography>
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
