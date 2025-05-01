import { DataTypes } from 'sequelize'
import { sequelize } from '../index.js'

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

export default Role
