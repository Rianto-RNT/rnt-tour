const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tour-routes')
const userRouter = require('./routes/user-routes')

const app = express()

// MIDDLEWARE
app.use(morgan('dev'))

app.use(express.json()) // to support JSON-encoded bodies

app.use((req, res, next) => {
  console.log('middleware lewat...')
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
