import React, { useState } from "react"
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const jobTypes = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Mechanic",
  "Gardener",
  "Cleaning",
  "Tailor",
  "Baker",
  "Cook",
]

const AddService = () => {
  const { isAuthenticated, token } = useAuth()
  const navigate = useNavigate()
  const [service, setService] = useState({
    jobType: "",
    ratePerHour: "",
    contactInfo: "",
  })

  const handleChange = e => {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!isAuthenticated) {
      console.log("User is not authenticated")
      return
    }

    console.log("Token in handleSubmit:", token)

    try {
      console.log("Token before making the API call:", token)
      const response = await fetch("http://localhost:8080/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      })

      if (response.ok) {
        console.log("Service added successfully")
        navigate("/services")
      } else {
        console.log("Error adding service")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          border: "2px solid lightgrey",
          borderRadius: "6px",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <Box sx={{ my: 4, padding: "25px" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add a Service
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="jobType-label">Job Type</InputLabel>
                  <Select
                    labelId="jobType-label"
                    id="jobType"
                    name="jobType"
                    value={service.jobType}
                    onChange={handleChange}
                  >
                    {jobTypes.map(jobType => (
                      <MenuItem key={jobType} value={jobType}>
                        {jobType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  name="ratePerHour"
                  label="Rate per Hour"
                  value={service.ratePerHour}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="contactInfo"
                  label="Contact Information"
                  value={service.contactInfo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export default AddService
