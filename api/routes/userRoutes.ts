import auth from "../middleware/auth"
import express from 'express'
import UserController from "../controllers/user"
import UsersController from "../controllers/users"
const bodyParser = require("body-parser")

const { check } = require('express-validator')

const router = express()
router.use(
    bodyParser.urlencoded({ extended: true }),
);
const loginValidation = [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 6 })
]

// UNPROTECTED ROUTE
router.post('/login', loginValidation, UserController.login)
router.post('/check', UserController.check)

// PROTECTED ROUTE
router.get('/', auth, UsersController.find)
router.post('/', auth, UsersController.create)
router.get('/:id', auth, UsersController.findId)
router.put('/:id', auth, UsersController.update)
router.delete('/:id', auth, UsersController.delete)
router.post('/logout', auth, UserController.logout)

module.exports = router