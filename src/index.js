const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const Redis = require('ioredis')
const redisSessionClient = new Redis({
  port: 6379,
  // host: 'zhishiku_redis',
  host: 'matchmaker_redis',
  db: 1,
})
const errorHandler = require('errorhandler')

const checkLoginMiddleware = require('./middleware/checkLogin')
const responseMiddleware = require('./middleware/response')
const log4js = require('./middleware/log4js')
const logger = log4js.getLogger('index.js')

const articleRouter = require('./router/article')
const userRouter = require('./router/user')
const webhookRouter = require('./router/webhook')

const app = express()
app.use(cookieParser('myzhishiku'))
app.use(
  session({
    secret: 'myzhishiku',
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
      client: redisSessionClient,
    }),
    cookie: {
      maxAge: 7200000,
      path: '/',
      httpOnly: true,
      secure: false,
    },
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//中间件
if ('development' == app.get('env')) {
  app.use(log4js.loggerMiddleware)
}
app.use(responseMiddleware)
app.use(checkLoginMiddleware)

//api接口
app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)
app.use('/api/webhook', webhookRouter)

//404
app.use(function(req, res, next) {
  res.status(404).send('URL NOT FOUND!')
})

//错误处理
if ('development' == app.get('env')) {
  app.use(errorHandler())
} else {
  app.use(function(err, req, res, next) {
    logger.fatal(err)
    res.status(500).send('Something broke!')
  })
}

module.exports = app
