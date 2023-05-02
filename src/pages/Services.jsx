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
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import { useAuth } from "../contexts/AuthContext"

const Services = () => {
  const [services, setServices] = useState([])
  const [editingService, setEditingService] = useState(null)
  const { user, token } = useAuth()

  //   console.log("Logged-in user:", user)

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
    try {
      console.log("user.token:", token)
      const response = await fetch(
        `http://localhost:8080/api/services/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete service.")
      }

      setServices(services.filter(service => service.id !== serviceId))
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  const handleEdit = serviceId => {
    const serviceToEdit = services.find(service => service.id === serviceId)
    setEditingService(serviceToEdit)
  }

  const handleUpdate = async event => {
    event.preventDefault()
    console.log("Editing service:", editingService)

    try {
      editingService.price = parseFloat(editingService.price)
      const response = await fetch(
        `http://localhost:8080/api/services/${editingService.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingService),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update service.")
      }

      const updatedService = await response.json()
      setServices(
        services.map(service =>
          service.id === updatedService.id ? updatedService : service
        )
      )
      setEditingService(null)
    } catch (error) {
      console.error("Error updating service:", error)
    }
  }

  const handleChange = event => {
    const { name, value } = event.target
    setEditingService(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <>
      <Header />
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            minHeight: "80vh",
            backgroundImage: `url(https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?cs=srgb&dl=pexels-dom-gould-325807.jpg&fm=jpg)`,
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
              //console.log("Service:", service)
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
                      sx={{
                        paddingTop: "10px",
                        paddingRight: "20px",
                      }}
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
                      {user && user.id === service.user_id && (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(service.id)}
                            size="small"
                            sx={{
                              marginRight: "10px",
                              marginTop: "50px",
                              backgroundColor: "#4caf50",
                              "&:hover": {
                                backgroundColor: "#016e03",
                              },
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(service.id)}
                            size="small"
                            sx={{
                              backgroundColor: "red",
                              marginTop: "50px",
                              "&:hover": {
                                backgroundColor: "red",
                                boxShadow: "0 0 10px 3px rgba(255, 0, 0, 0.2)",
                              },
                            }}
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
          {editingService && (
            <form onSubmit={handleUpdate}>
              <h3>Edit Service</h3>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={editingService.category}
                  onChange={handleChange}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={editingService.description}
                  onChange={handleChange}
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={editingService.price}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditingService(null)}>
                Cancel
              </button>
            </form>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default Services
