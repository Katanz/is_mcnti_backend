const path = require('path')
const {Event, File} = require('../models/models')
const ApiError = require('../error/ApiError')

class EventController {
  async create(req, res, next) {
    try {
      const {title, description, eventTypeId, userId} =
        req.body

      const userIdInt = parseInt(userId)

      const {uploadedFiles} = req.files

      if (!uploadedFiles)
        return res.status(400).json('Файлов нет')

      const event = await Event.create({
        title,
        description,
        eventTypeId,
        userId: userIdInt
      })

      const getEvent = await Event.findOne({
        where: {},
        order: [['createdAt', 'DESC']]
      })

      const getDataIdFromEvent = getEvent.dataValues.id

      uploadedFiles.forEach(async file => {
        let fileName = userId + file.name
        let pathToFile = path.resolve(
          __dirname,
          '..',
          'static',
          fileName
        )

        await file.mv(pathToFile)

        let fileInfo = {
          name: fileName,
          pathToFile,
          eventId: getDataIdFromEvent,
          userId: userIdInt
        }

        await File.bulkCreate([fileInfo]).then(newFile => {
          event.addFile(newFile)
        })
      })

      return res.json(event)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getAll(req, res) {
    let {eventId, eventTypeId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    eventTypeId = eventTypeId || 1
    let events
    let offset = page * limit - limit
    if (!eventId && !eventTypeId) {
      events = await Event.findAndCountAll({limit, offset})
    }
    if (eventId && !eventTypeId) {
      events = await Event.findAndCountAll({
        where: {id: eventId},
        limit,
        offset
      })
    }
    if (!eventId && eventTypeId) {
      events = await Event.findAndCountAll({
        where: {eventTypeId},
        limit,
        offset
      })
    }
    if (eventId && eventTypeId) {
      events = await Event.findAndCountAll({
        where: {eventId, eventTypeId},
        limit,
        offset
      })
    }
    return res.json(events)
  }
  async getOne(req, res) {
    const {id} = req.params

    const event = await Event.findOne({
      where: {id},
      include: [
        {
          model: File,
          as: 'files'
        }
      ]
    })
    return res.json(event)
  }
  async delete(req, res) {}
}

module.exports = new EventController()
