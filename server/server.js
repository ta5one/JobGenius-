require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())
app.use(cors())

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
