const {Answer} = require('../models/models')
const ApiError = require('../error/ApiError')

class AnswerController {
  async create(req, res) {
    const {answer} = req.body,
    const answerSave = await Answer.create({answer})
    return res.json(answerSave)
  }
  async getAll(req, res) {
    const answers = await Answer.findAll
  }
  async getOne(req, res) {}
  async delete(req, res) {}
}

module.exports = new AnswerController()
