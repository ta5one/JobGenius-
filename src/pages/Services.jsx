import React from "react"
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material"
import backgroundImage from "../assets/images/mountain.jpg"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"

const Services = () => {
  const services = [
    { id: 1, title: "Cleaning", imageUrl: "https://placehold.co/400" },
    { id: 2, title: "Carpentry", imageUrl: "https://placehold.co/400" },
    { id: 3, title: "Painting", imageUrl: "https://placehold.co/400" },
    { id: 4, title: "Mechanic", imageUrl: "https://placehold.co/400" },
  ]

  return (
    <>
      <Header />
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            minHeight: "80vh",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "0%",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            color="white"
            textAlign="center"
            sx={{
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            Services Offered
          </Typography>
        </Box>
        <Container maxWidth="false" disableGutters>
          <Grid container spacing={4}>
            {services.map(service => (
              <Grid
                item
                key={service.id}
                xs={12}
                sm={6}
                md={4}
                sx={{ marginTop: "5%" }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={service.imageUrl}
                    alt={service.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {service.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default Services
