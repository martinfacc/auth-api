import express from 'express'
import { Session, User } from '../../database/models/index.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const userAgent = req.headers['user-agent']

    // Validate user credentials (this is just a placeholder, implement your own logic)
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Check if password matches (this is just a placeholder, implement your own logic)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Create a session (this is just a placeholder, implement your own logic)
    const session = await Session.create({
      userId: user.id,
      userAgent,
    })

    res.status(201).json(session)
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/logout', async (req, res) => {
  const { user, session } = req

  try {
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' })
    }

    // Validate session (this is just a placeholder, implement your own logic)
    if (!session) {
      return res.status(401).json({ error: 'Session not found' })
    }

    await Session.destroy({
      where: { id: session.id },
    })

    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error during logout:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/current', async (req, res) => {
  const { session } = req
  try {
    if (!session) {
      return res.status(401).json({ error: 'Session not found' })
    }

    res.status(200).json(session)
  } catch (error) {
    console.error('Error fetching current session:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
