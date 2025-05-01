import express from 'express'
import { User } from '../../database/models/index.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body
  try {
    // Validate user input (this is just a placeholder, implement your own logic)
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    // Create a new user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      roleId: 2,
    })

    res.status(201).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  } catch (error) {
    console.error('Error during registration:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
