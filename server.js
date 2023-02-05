const app = require('./app')

// PORT
const port = 3000

// SERVER
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
