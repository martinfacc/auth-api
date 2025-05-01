import { DataTypes } from 'sequelize'
import { sequelize } from '../index.js'

const Session = sequelize.define(
  'Session',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

export default Session
