import auth from "../middleware/auth"
import express from 'express'
import UsersController from "../controllers/users"

const router = express()

router.get('/current-user', auth, UsersController.current)

module.exports = router