import TeachersController from "../controllers/teachers"
import express from 'express'
import auth from "../middleware/auth"

const router = express()

router.get('/', auth, TeachersController.find)
router.post('/', auth, TeachersController.create)
router.get('/:id', auth, TeachersController.findId)
router.put('/:id', auth, TeachersController.update)
router.delete('/:id', auth, TeachersController.delete)

module.exports = router