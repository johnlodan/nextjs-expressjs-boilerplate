import StudentsController from "../controllers/students"
import auth from "../middleware/auth"
import express from 'express'

const router = express()

router.get('/', auth, StudentsController.find)
router.post('/', auth, StudentsController.create)
router.get('/:id', auth, StudentsController.findId)
router.put('/:id', auth, StudentsController.update)
router.delete('/:id', auth, StudentsController.delete)

module.exports = router