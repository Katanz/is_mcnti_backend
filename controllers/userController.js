const bcrypt = require('bcrypt')
const {User, Role, Position} = require('../models/models')
const jwt = require('jsonwebtoken')

const ApiError = require('../error/ApiError')

const generateJwt = (
  id,
  fullName,
  email,
  roleId,
  positionId
) => {
  return jwt.sign(
    {
      id,
      fullName,
      email,
      roleId,
      positionId
    },
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    const {fullName, email, password, roleId, positionId} =
      req.body

    if (!email || !password || !fullName)
      return next(
        ApiError.badRequest('Не все поля заполнены.')
      )

    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(
        ApiError.badRequest(
          'Пользователь с таким e-mail уже зарегистрирован.'
        )
      )
    }

    const hashPassword = await bcrypt.hash(password, 4)
    const role = await Role.findOne({where: {id: roleId}})
    const position = await Position.findOne({
      where: {id: positionId}
    })

    const user = await User.create({
      fullName,
      email,
      password: hashPassword
    })
    await user.addRole(role)
    await user.addPosition(position)

    const token = generateJwt(
      user.id,
      user.fullName,
      user.email,
      user.roleId,
      user.positionId
    )

    return res.json(token)
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(
        ApiError.internal('Пользователь не найден')
      )
    }
    let comparePassword = bcrypt.compareSync(
      password,
      user.password
    )
    if (!comparePassword) {
      return next(
        ApiError.internal('Указан неверный пароль ')
      )
    }

    const token = generateJwt(
      user.id,
      user.fullName,
      user.email,
      user.roleId,
      user.positionId
    )

    return res.json(token)
  }

  async isAuth(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.fullName,
      req.user.email,
      req.user.roleId
    )

    return res.json({token})
  }
}

module.exports = new UserController()
