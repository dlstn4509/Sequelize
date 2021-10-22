/****************************** dotenv init ********************/
require('./modules/dotenv-init')()
// require('dotenv').config()


/****************************** global init ********************/
const path = require('path')
const express = require('express')
const app = express()
const { sequelize } = require('./models')



/****************************** sever init ******************/
require('./modules/server-init')(app, process.env.PORT)


/****************************** sequelize init ******************/
require('./modules/sequelize-init')(sequelize)



/****************************** view engine *******************/
app.set('view engine', 'ejs')
app.set('views', './views')
app.locals.pretty = true



/****************************** middleware ********************/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



/***************************** static init ********************/
app.use('/', express.static(path.join(__dirname, 'public')))



/***************************** router init ********************/
const userRouter = require('./routes/user')

app.use('/user', userRouter)



/***************************** error init ********************/
const _404Router = require('./routes/error/404-router')
const _500Router = require('./routes/error/500-router')
app.use(_404Router)
app.use(_500Router)





