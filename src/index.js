import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import { sequelize } from './database/index.js'
import router from './router/index.js'
import { authMiddleware } from './middleware.js'
import { APP_PORT } from './env.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(authMiddleware)
app.use('/api', router)

app.listen(APP_PORT, async () => {
  await sequelize.sync({ force: false })
  console.log('✅ Database synced')

  console.log(`🚀 Server running at http://localhost:${APP_PORT}`)

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
