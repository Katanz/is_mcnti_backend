const Router = require('express')
const router = new Router()
const positionController = require('../controllers/PositionController')

router.post('/add-position', positionController.create)
router.get('/positions', positionController.getAll)
router.delete('/positions/:id', positionController.delete)

module.exports = router

