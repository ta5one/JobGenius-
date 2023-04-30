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
  const [service, setService] = useState({
    jobType: "",
    ratePerHour: "",
    contactInfo: "",
  })

  const handleChange = e => {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(service)
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
