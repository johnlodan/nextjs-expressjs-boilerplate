import IndexController from './controllers/index'
import InitiateMongoServer from './config/db'
import UserController from './controllers/user'
const createError = require('http-errors')
const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const userRoutes = require('./routes/userRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const studentRoutes = require('./routes/studentRoutes')
const teacherRoutes = require('./routes/teacherRoutes')

// Initiate Mongo Server
InitiateMongoServer()

var app = express()
app.use(
  bodyParser.urlencoded({ extended: true }),
);

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', IndexController)
app.use('/dashboard', dashboardRoutes)
app.use('/user', userRoutes)
app.use('/student', studentRoutes)
app.use('/teacher', teacherRoutes)


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

