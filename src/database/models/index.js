import User from './user.js'
import Role from './role.js'
import Permission from './permission.js'
import RolePermission from './role-permission.js'
import Session from './session.js'

// Associations
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' })
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' })

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'roleId',
  as: 'permissions',
})
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permissionId',
  as: 'roles',
})

User.hasMany(Session, { foreignKey: 'userId', as: 'sessions' })
Session.belongsTo(User, { foreignKey: 'userId', as: 'user' })

export { User, Role, Permission, Session }
