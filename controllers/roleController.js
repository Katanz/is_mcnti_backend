const {Role} = require('../models/models')
const ApiError = require('../error/ApiError')

class RoleController {
  async create(req, res) {
    const {role} = req.body
    const roleSave = await Role.create({role})
    return res.json(roleSave)
  }
  async getAll(req, res) {
    const roles = await Role.findAll()
    return res.json(roles)
  }
  async delete(req, res) {}
}

module.exports = new RoleController()
