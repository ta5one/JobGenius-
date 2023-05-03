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
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import { useAuth } from "../contexts/AuthContext"

const Services = () => {
  const [services, setServices] = useState([])
  const [editingService, setEditingService] = useState(null)
  const { user, token } = useAuth()
  const [openModal, setOpenModal] = useState(false)

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

  const handleOpenModal = serviceId => {
    const serviceToEdit = services.find(service => service.id === serviceId)
    setEditingService(serviceToEdit)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setEditingService(null)
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

  const handleEdit = (serviceId, e) => {
    e.stopPropagation()
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
        <Container
          maxWidth="false"
          disableGutters
          sx={{
            marginBottom: "5%",
            backgroundColor: "#f5f5f5",
            marginTop: "5%",
            paddingBottom: "100px",
          }}
        >
          <Grid container spacing={4}>
            {services.map(service => {
              const {
                id,
                category,
                description,
                price,
                contactInfo,
                user_id,
                first_name,
                last_name,
                email,
              } = service
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
                  <Box onClick={() => handleOpenModal(service.id)}>
                    <Card style={{ height: "600px", overflow: "auto" }}>
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
                              onClick={e => handleEdit(service.id, e)}
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
                                backgroundColor: "#FF0000",
                                marginTop: "50px",
                                "&:hover": {
                                  backgroundColor: "#cb0000",
                                },
                              }}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
          {editingService && user && user.id === editingService.user_id && (
            <Dialog
              open={!!editingService}
              onClose={() => setEditingService(null)}
            >
              <DialogTitle>Edit Service</DialogTitle>
              <DialogContent>
                <form onSubmit={handleUpdate}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Category"
                    name="category"
                    value={editingService.category}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    name="description"
                    value={editingService.description}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Price"
                    name="price"
                    type="number"
                    value={editingService.price}
                    onChange={handleChange}
                  />
                  <DialogActions>
                    <Button type="submit" color="primary" variant="contained">
                      Update
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setEditingService(null)}
                      color="secondary"
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </Container>
      </Box>
      {editingService && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-service-details"
          aria-describedby="modal-service-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="modal-service-details" variant="h6" component="h2">
              {editingService.category}
            </Typography>
            <Typography id="modal-service-description" variant="body1">
              {editingService.description}
            </Typography>
            <Typography variant="body1">
              Price per hour: ${editingService.price}
            </Typography>
            <Typography variant="body1">
              Name: {editingService.first_name} {editingService.last_name}
            </Typography>
            <Typography variant="body1">
              Email: {editingService.email}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Button
                color="error"
                size="small"
                onClick={handleCloseModal}
                startIcon={<CloseIcon />}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "start" }}>
            Why Choosing A Certified Professional is Better
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "start" }}>
            One of the key advantages of using JobGenius to hire a certified
            professional for your service needs is the peace of mind that comes
            with knowing that you are working with a trained and experienced
            expert. While it may be tempting to attempt a DIY approach,
            especially if you're trying to save some money, the risks and
            potential complications of taking on a project yourself can quickly
            outweigh any potential savings.
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "start" }}>
            By choosing a certified professional on JobGenius, you can be
            confident that the person you hire has the necessary knowledge,
            training, and experience to get the job done right. From plumbers
            and electricians to carpenters and painters, each service provider
            on the platform is thoroughly vetted and background-checked to
            ensure that they meet the highest standards of quality and
            professionalism.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Mw97K_qf9JU"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Grid>
      </Grid>

      <Footer />
    </>
  )
}

export default Services
