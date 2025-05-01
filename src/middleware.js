import { Session, User, Role, Permission } from './database/models/index.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    if (!token) throw new Error('No token provided')

    const session = await Session.findOne({
      where: { token },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
          include: [
            {
              model: Role,
              as: 'role',
              include: [
                {
                  model: Permission,
                  as: 'permissions',
                },
              ],
            },
          ],
        },
      ],
    })

    if (!session) throw new Error('Session not found')

    if (!session.user) throw new Error('User not found')

    if (!session.user.role) throw new Error('Role not found')

    if (!session.user.role.permissions) throw new Error('Permissions not found')

    req.session = session
    req.user = session.user
    req.role = session.user.role
    req.permissions = session.user.role.permissions
  } catch (error) {
    console.error('Authentication error:', error.message)
    req.user = null
    req.session = null
    req.role = null
    req.permissions = []
  } finally {
    next()
  }
}
