import React from "react"
import { Box, Container, Grid, Typography, Link } from "@mui/material"

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: "2rem" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About JobGenius
            </Typography>
            <Typography variant="body2">
              JobGenius is a multi-service marketplace platform that connects
              service providers with customers seeking various services.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            <Link href="#" variant="body2" display="block" gutterBottom>
              Home
            </Link>
            <Link href="#" variant="body2" display="block" gutterBottom>
              Browse Services
            </Link>
            <Link href="#" variant="body2" display="block" gutterBottom>
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" gutterBottom>
              Address: 123 Water St, Brisbane, Australia
            </Typography>
            <Typography variant="body2" gutterBottom>
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2" gutterBottom>
              Email: support@jobgenius.com
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} JobGenius. All rights reserved. Created
            By Mohammed T Ali
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
