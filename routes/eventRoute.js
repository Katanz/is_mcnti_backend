const Router = require('express')
const router = new Router()
const eventController = require('../controllers/eventController')

router.post('/create', eventController.create)
router.get('/events', eventController.getAll)
router.get('/event/:id', eventController.getOne)
router.delete('/event/:id', eventController.delete)

module.exports = router
