const uuid = require('uuid')
const path = require('path')
const {News} = require('../models/models')

class NewsController {
  async create(req, res) {
    const {title, description, rating} = req.body
    const {fileId} = req.files
    let fileName = uuid.v4() + '.jpg'
    file.mv(
      path.resolve(__dirname, '..', 'static', fileName)
    )
    // const news
  }
  async getAll(req, res) {}
  async getOne(req, res) {}
  async delete(req, res) {}
}

module.exports = new NewsController()
