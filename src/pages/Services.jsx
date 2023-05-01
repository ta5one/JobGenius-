import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material"
import backgroundImage from "../assets/images/mountain.jpg"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import { useAuth } from "../contexts/AuthContext"

const Services = () => {
  const [services, setServices] = useState([])
  const { user } = useAuth()

  console.log("Logged-in user:", user)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/services")
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }

    fetchServices()
  }, [])

  function getCategoryImage(category) {
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
      Cleaning:
        "https://cdn.pixabay.com/photo/2016/07/20/23/31/girl-1531575_960_720.jpg",
      Tailor:
        "https://cdn.pixabay.com/photo/2017/06/27/17/32/sew-2448191_960_720.jpg",
      Baker:
        "https://cdn.pixabay.com/photo/2016/11/29/08/24/bakery-1868396_960_720.jpg",
      Cook: "https://cdn.pixabay.com/photo/2017/08/10/14/09/restaurant-2623071_960_720.jpg",
    }

    return imageMap[category] || "https://placehold.co/600x400"
  }

  const handleDelete = async serviceId => {
    // Implement the delete functionality here
  }

  const handleEdit = serviceId => {
    // Implement the edit functionality here
  }

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
        <Container maxWidth="false" disableGutters sx={{ marginBottom: "5%" }}>
          <Grid container spacing={4}>
            {services.map(service => {
              console.log("Service:", service)
              return (
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
                      image={getCategoryImage(service.category)}
                      sx={{ padding: "5px" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {service.category} - ${service.price}
                        /hour
                      </Typography>
                      <Typography variant="subtitle1">
                        {service.description}
                      </Typography>
                      <Typography variant="body1">
                        {service.contactInfo}
                      </Typography>
                      {user && user.id === service.userId && (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(service.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(service.id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default Services
