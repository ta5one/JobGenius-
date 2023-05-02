require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express()
app.use(express.json())
app.use(cors())

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function requireAuth(req, res, next) {
  console.log("Inside requireAuth")
  const authHeader = req.headers.authorization
  if (!authHeader) {
    console.log("No auth header")
    return res.status(401).json("No authorization header provided")
  }

  const token = authHeader.split(" ")[1]
  console.log("Received token in requireAuth:", token)

  if (!token) {
    console.log("Invalid token")
    return res.status(401).json("Invalid token")
  }

  console.log("Received token in requireAuth:", token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("Decoded JWT payload in requireAuth:", decoded)
    req.user = { id: decoded.userId }
    next()
  } catch (err) {
    console.error(err.message)
    res.status(401).json("Unauthorized")
  }
}

app.post("/api/services", requireAuth, async (req, res) => {
  const { jobType, ratePerHour, contactInfo } = req.body
  const user_id = req.user.id

  try {
    await pool.query(
      "INSERT INTO services (user_id, category, title, description, price) VALUES ($1, $2, $3, $4, $5)",
      [user_id, jobType, "Title Placeholder", contactInfo, ratePerHour]
    )
    res.status(201).json({ message: "Service added successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error adding service" })
  }
})

app.get("/api/services", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT services.*, users.first_name, users.last_name
      FROM services
      JOIN users ON services.user_id = users.id
    `)
    res.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error fetching services" })
  }
})

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Test route is working!" })
})

app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, hashedPassword]
    )

    res.status(201).json(newUser.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).json("Server error")
  }
})

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body
  console.log("Received email:", email)
  console.log("Received password:", password)

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ])
    console.log("User from DB:", user.rows[0])

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid email or password")
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    )
    console.log("Password match:", passwordMatch)

    if (!passwordMatch) {
      return res.status(401).json("Invalid email or password")
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    )
    console.log("Generated token:", token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("Decoded JWT payload:", decoded)

    const userProfile = { ...user.rows[0] }
    delete userProfile.password_hash

    console.log("Sending token:", token)
    res.status(200).json({ user: userProfile, token })
  } catch (err) {
    console.error(err.message)
    res.status(500).json("Server error")
  }
})

app.get("/api/profile", requireAuth, async (req, res) => {
  console.log("Inside /api/profile")
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user.id,
    ])

    if (!user.rows[0]) {
      return res.status(404).json("User not found")
    }

    const userProfile = { ...user.rows[0] }
    delete userProfile.password_hash

    res.status(200).json(userProfile)
  } catch (err) {
    console.error(err.message)
    res.status(500).json("Server error")
  }
})

app.delete("/api/services/:id", requireAuth, async (req, res) => {
  try {
    const serviceId = req.params.id
    const userId = req.user.id

    const serviceResult = await pool.query(
      "SELECT * FROM services WHERE id = $1",
      [serviceId]
    )
    const service = serviceResult.rows[0]

    if (!service) {
      return res.status(404).json({ error: "Service not found." })
    }
    if (parseInt(service.user_id) !== parseInt(userId)) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this service." })
    }

    await pool.query("DELETE FROM services WHERE id = $1", [serviceId])

    res.status(204).send()
  } catch (error) {
    console.error("Error deleting service:", error)
    res.status(500).json({ error: "Internal server error." })
  }
})

app.put("/api/services/:id", requireAuth, async (req, res) => {
  console.log("req.user:", req.user)
  const serviceId = req.params.id
  const { category, description, price } = req.body

  try {
    const result = await pool.query(
      "UPDATE services SET category = $1, description = $2, price = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [category, description, price, serviceId, req.user.id]
    )

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Service not found or not owned by user." })
    } else {
      res.json(result.rows[0])
    }
  } catch (error) {
    console.error("Error updating service:", error)
    res.status(500).json({ error: "Failed to update service." })
  }
})

app.get("/api/categories", async (req, res) => {
  const searchTerm = req.query.query
  try {
    const result = await pool.query(
      "SELECT DISTINCT category FROM services WHERE category ILIKE $1",
      [`%${searchTerm}%`]
    )
    res.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error fetching categories" })
  }
})

app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.query
  try {
    const result = await pool.query(
      "SELECT * FROM services WHERE category ILIKE $1",
      [`%${searchTerm}%`]
    )
    res.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error fetching search results" })
  }
})

app.get("/api/suggestions", async (req, res) => {
  const searchTerm = req.query.query
  try {
    const result = await pool.query(
      "SELECT DISTINCT category FROM services WHERE category ILIKE $1",
      [`%${searchTerm}%`]
    )
    res.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error fetching suggestions" })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
