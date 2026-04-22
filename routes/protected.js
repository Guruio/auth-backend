import express from "express"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to protected dashboard 🎉" })
})

export default router