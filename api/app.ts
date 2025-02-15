import StudentsController from './controllers/students'
import TeachersController from './controllers/teachers'
import UserController from './controllers/user'
import IndexController from './controllers/index'
import InitiateMongoServer from './config/db'
import auth from './middleware/auth'

const createError = require('http-errors')
const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const { check } = require('express-validator')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const loginValidation = [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Please enter a valid password').isLength({ min: 6 })
]
// Initiate Mongo Server
InitiateMongoServer()

var app = express()
app.use(
  bodyParser.urlencoded({ extended: true }),
);

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', IndexController)

// OPEN API
// Login
app.post('/login', loginValidation, UserController.login)
app.post('/check', UserController.check)

// SECURED API
app.get('/students', auth, StudentsController.find)
app.get('/student/:id', auth, StudentsController.findId)
app.post('/student', auth, StudentsController.create)
app.put('/student/:id', auth, StudentsController.update)
app.delete('/student/:id', auth, StudentsController.delete)

app.get('/teachers', auth, TeachersController.find)
app.get('/teacher/:id', auth, TeachersController.findId)
app.post('/teacher', auth, TeachersController.create)
app.put('/teacher/:id', auth, TeachersController.update)
app.delete('/teacher/:id', auth, TeachersController.delete)

// Users Controller
app.post('/user/logout', auth, UserController.logout)

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
  next(createError(404))
})

// error handler
app.use(function (err: any, req: any, res: any, _next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app

