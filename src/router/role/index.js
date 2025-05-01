import express from 'express'
import { Role } from '../../database/models/index.js'

const router = express.Router()

router.get('/all', async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ['id', 'name'],
    })
    res.status(200).json(roles)
  } catch (error) {
    console.error('Error fetching roles:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
