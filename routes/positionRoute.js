const Router = require('express')
const router = new Router()
const positionController = require('../controllers/PositionController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), positionController.create)
router.get('/', positionController.getAll)
router.delete('/:id', positionController.delete)

module.exports = router

