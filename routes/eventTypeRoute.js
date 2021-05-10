const Router = require('express')
const router = new Router()
const eventController = require('../controllers/EventController')

router.post('/add-event', eventController.create)
router.get('/events', eventController.getAll)
router.delete('/events/:id', eventController.delete)

module.exports = router
