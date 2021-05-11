const bcrypt = require('bcrypt')
const {User, Role, Position} = require('../models/models')

const ApiError = require('../error/ApiError')

class UserController {
  async registration(req, res, next) {
    const {
      firstName,
      secondName,
      thirdName,
      email,
      password
    } = req.body

    if (!email || !password || !firstName || !secondName) {
      return next(ApiError.badRequest('Не все поля заполнены.'))
    }

    const candidate = await User.findOne({where: {email}})
    if (candidate) {
     return next(ApiError.badRequest('Пользователь с таким e-mail уже зарегистрирован'))
    }

    const hashPassword = bcrypt.hash(password, 6)
    const userRole = await Role.findOne({where})

    const user = await User.create({
      firstName,
      secondName,
      thirdName,
      email,
      password: hashPassword,
      // role = 
    })
  }
  async login(req, res) {}

  async isAuth(req, res, next) {
    const {id} = req.query
    if (!id) {
      return next(ApiError.badRequest('Id не указан'))
    }
    res.json(id)
  }
}

module.exports = new UserController()
