const {EventType} = require('../models/models')
const ApiError = require('../error/ApiError')

class EventTypeController {
  async create(req, res) {
    const {eventType} = req.body
    const eventTypeSave = await EventType.create({
      eventType
    })
    return res.json(eventTypeSave)
  }
  async getAll(req, res) {
    const eventTypes = await EventType.findAll()
    return res.json(eventTypes)
  }
  async delete(req, res) {}
}

module.exports = new EventTypeController()
