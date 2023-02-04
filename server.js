const fs = require('fs')
const express = require('express')

const app = express()

const port = 3000

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/json/simple-tours.json`)
)

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
