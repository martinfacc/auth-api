import { sequelize } from '../index.js'
import { Role, User } from '../models/index.js'
import ROLES from './role.js'
import USERS from './user.js'

const seed = async () => {
  let transaction = null
  try {
    await sequelize.sync({ force: true })
    console.log('✅ Database synced')

    transaction = await sequelize.transaction()

    await Role.bulkCreate(ROLES, { transaction })
    await User.bulkCreate(USERS, { transaction })
    console.log('🌱 Database seeded')

    await transaction.commit()
    process.exit(0)
  } catch (error) {
    if (transaction) await transaction.rollback()
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
