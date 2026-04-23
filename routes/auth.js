import express from "express"
import User from "../models/user.js"
import bcrypt from "bcryptjs"

const router = express.Router()

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    await newUser.save()

    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
import jwt from "jsonwebtoken"

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    console.log("LOGIN ERROR:", error)  // 🔥 VERY IMPORTANT
    res.status(500).json({ message: "Server error" })
  }
})
export default router