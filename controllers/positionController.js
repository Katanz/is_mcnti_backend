const {Position} = require('../models/models')
const ApiError = require('../error/ApiError')

class PositionController {
  async create(req, res) {
    const {position} = req.body
    const addPosition = await Position.create({
      position
    })
    return res.json(addPosition)
  }
  async getAll(req, res) {
    const positions = await Position.findAll()
    return res.json(positions)
  }
  async delete(req, res) {}
}

module.exports = new PositionController()
