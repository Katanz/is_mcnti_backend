const Router = require('express')
const router = new Router()
const roleController = require('../controllers/RoleController')

router.post('/add-role', roleController.create)
router.get('/', roleController.getAll)
router.delete('/role/:id', roleController.delete)

module.exports = router
