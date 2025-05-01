import { DataTypes } from 'sequelize'
import { sequelize } from '../index.js'

const RolePermission = sequelize.define('RolePermission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  permissionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

export default RolePermission
