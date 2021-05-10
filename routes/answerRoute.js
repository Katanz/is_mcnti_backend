const Router = require('express')
const router = new Router()
const answerController = require('../controllers/AnswerController')

router.post('/add-answer', answerController.create)
router.getAll('/answers', answerController.getAll)
router.getOne('/answer/:id', answerController.getOne)
router.delete('/answers/:id', answerController.delete)

module.exports = router
