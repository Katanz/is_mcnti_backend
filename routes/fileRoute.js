const Router = require('express')
const router = new Router()
const fileController = require('../controllers/fileController')

router.post('/add-file', fileController.create)
router.get('/files', fileController.getAll)
router.get('/file/:id', fileController.getOne)
router.delete('/file/:id', fileController.delete)

module.exports = router
