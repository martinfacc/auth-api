import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import { sequelize } from './database/index.js'
import router from './router/index.js'
import Role from './database/models/role.js'
import ROLES from './database/seeders/role.js'
import { authMiddleware } from './middleware.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(authMiddleware)
app.use('/api', router)

app.listen(3033, async () => {
  await sequelize.sync({ force: true })
  console.log('✅ Database synced')

  await Role.bulkCreate(ROLES)
  console.log('🌱 Database seeded')

  console.log('🚀 Server running at http://localhost:3033')

  // Mover aquí el listado de endpoints
  const endpoints = listEndpoints(app)
  console.log('📌 Endpoints registrados:')
  console.table(
    endpoints.map((e) => ({
      path: e.path,
      methods: e.methods.join(', '),
    }))
  )
})
