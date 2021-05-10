const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')

router.post('/add-question', questionController.create)
router.get('/questions', questionController.getAll)
router.get('/question/:id', questionController.getOne)
router.delete('/question/:id', questionController.delete)

module.exports = router
