const Router = require('express')
const router = new Router()
const eventTypeController = require('../controllers/EventTypeController')

router.post('/', eventTypeController.create)
router.get('/', eventTypeController.getAll)
router.delete('/:id', eventTypeController.delete)

module.exports = router
