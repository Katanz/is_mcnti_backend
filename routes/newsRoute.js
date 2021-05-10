const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')

router.post('/add-news', newsController.create)
router.get('/news', newsController.getAll)
router.get('/news/:id', newsController.getOne)
router.delete('/news/:id', newsController.delete)

module.exports = router
