const Router = require('express')
const router = new Router()
const manualController = require('../controllers/manualController')

router.post('/create', manualController.create)
router.get('/manuals', manualController.getAll)
router.get('/manual/:id', manualController.getOne)
router.delete('/manual/:id', manualController.delete)

module.exports = router
