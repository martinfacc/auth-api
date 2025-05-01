import express from 'express'
import sessionRouter from './session/index.js'
import userRouter from './user/index.js'
import roleRouter from './role/index.js'

const router = express.Router()

router.use('/session', sessionRouter)
router.use('/user', userRouter)
router.use('/role', roleRouter)

export default router
