require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())
app.use(cors())
const jwt = require("jsonwebtoken")

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

function requireAuth(req, res, next) {
  console.log("Inside requireAuth")
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json("No authorization header provided")
  }

  const token = authHeader.split(" ")[1]
  console.log("Received token in requireAuth:", token)

  if (!token) {
    return res.status(401).json("Invalid token")
  }

  console.log("Received token in requireAuth:", token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("Decoded JWT payload in requireAuth:", decoded)
    req.userId = decoded.userId
    next()
  } catch (err) {
    console.error(err.message)
    res.status(401).json("Unauthorized")
  }
}

console.log("JWT_SECRET:", process.env.JWT_SECRET)

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
        expiresIn: "1h",
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
      req.userId,
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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
