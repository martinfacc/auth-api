import express from 'express'
import { Role, User } from '../../database/models/index.js'

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

router.post('/create', async (req, res) => {
  try {
    const { user } = req

    if (user.roleId !== 1) return res.status(403).json({ error: 'Forbidden' })

    const { firstname, lastname, email, password, roleId } = req.body
    // Validate user input (this is just a placeholder, implement your own logic)
    if (!firstname || !lastname || !email || !password || !roleId) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    // Create a new user
    const createdUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      roleId,
    })

    res.status(201).json({
      id: createdUser.id,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      email: createdUser.email,
      roleId: createdUser.roleId,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    })
  } catch (error) {
    console.error('Error during creation:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/update', async (req, res) => {
  try {
    const { user } = req

    if (user.roleId !== 1) return res.status(403).json({ error: 'Forbidden' })

    const { id, firstname, lastname, email, password, roleId } = req.body
    // Validate user input (this is just a placeholder, implement your own logic)
    if (!id || !firstname || !lastname || !email || !password || !roleId) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Check if user exists
    const existingUser = await User.findByPk(id)
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Update the user
    await existingUser.update({
      firstname,
      lastname,
      email,
      password,
      roleId,
    })

    res.status(200).json({
      id: existingUser.id,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      email: existingUser.email,
      roleId: existingUser.roleId,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    })
  } catch (error) {
    console.error('Error during update:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/delete', async (req, res) => {
  try {
    const { user } = req

    if (user.roleId !== 1) return res.status(403).json({ error: 'Forbidden' })

    const { id } = req.body
    // Validate user input (this is just a placeholder, implement your own logic)
    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }

    // Check if user exists
    const existingUser = await User.findByPk(id)
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Delete the user
    await existingUser.destroy()

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error during deletion:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/all', async (req, res) => {
  try {
    const { user } = req
    if (user.roleId !== 1) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
    })
    res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
