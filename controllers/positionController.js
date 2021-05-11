const {Position} = require('../models/models')
const ApiError = require('../error/ApiError')

class PositionController {
  async create(req, res) {
    const {name} = req.body
    const positionSave = await Position.create({name})
    return res.json(positionSave)
  }
  async getAll(req, res) {
    const positions = await Position.findAll()
    return res.json(positions)
  }
  async delete(req, res) {}
}

module.exports = new PositionController()
