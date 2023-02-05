const fs = require('fs')
const express = require('express')

const app = express()

app.use(express.json()) // to support JSON-encoded bodies

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/json/simple-tours.json`)
)

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'Success Get All', result: tours.length, data: { tours } })
})

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params)
  const id = Number(req.params.id)
  const tour = tours.find((el) => el.id === id)

  if (id > tours.length) {
    return res.status(404).json({
      status: 'Not Found',
      message: `ID:'${Number(req.params.id)}' yang anda cari tidak ditemukan!`,
    })
  }

  res.status(200).json({ status: 'Success Get One', data: { tour } })
})

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(
    `${__dirname}/data/json/simple-tours.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).send('Error writing to file')
        return
      }

      res.status(201).json({
        status: 'Success Create',
        data: {
          tour: newTour,
        },
      })
    }
  )
})

app.patch('/api/v1/tours/:id', (req, res) => {
  const tourId = Number(req.params.id)
  const tourIndex = tours.findIndex((tour) => tour.id === tourId)

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'Failed to update',
      message: `ID:'${Number(
        req.params.id
      )}' yang anda update tidak ditemukan!`,
    })
  }

  // Update the tour properties
  const updatedTour = Object.assign({}, tours[tourIndex], req.body)
  tours[tourIndex] = updatedTour

  fs.writeFile(
    `${__dirname}/data/json/simple-tours.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).send('Error writing to file')
        return
      }

      // Return a success response
      res.status(200).json({
        status: 'Success Update',
        data: {
          tour: updatedTour,
        },
      })
    }
  )
})

const port = 3000

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
