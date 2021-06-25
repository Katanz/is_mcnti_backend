const {EventType} = require('../models/models')
const ApiError = require('../error/ApiError')

class EventTypeController {
  async create(req, res) {
    try {
      const {name} = req.body
      console.log('title is ', name)
      const eventTypeSave = await EventType.create({
        name
      })

      return res.json(eventTypeSave)
    } catch (e) {
      ApiError.badRequest(e.message)
    }
  }

  async getAll(req, res) {
    const eventTypes = await EventType.findAll()
    return res.json(eventTypes)
  }
  async delete(req, res) {}
}

module.exports = new EventTypeController()
