const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const app = express()

// MIDDLEWARE
app.use(morgan('dev'))

app.use(express.json()) // to support JSON-encoded bodies

app.use((req, res, next) => {
  console.log('middleware lewat...')
  next()
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/json/simple-tours.json`)
)

// TOUR CONTROLLERS
const getTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'Success Get All', result: tours.length, data: { tours } })
}

const getTour = (req, res) => {
  const tourId = Number(req.params.id)
  const tour = tours.find((tour) => tour.id === tourId)

  if (!tour) {
    return res.status(404).json({
      status: 'Not Found',
      message: `ID:'${Number(req.params.id)}' yang anda cari tidak ditemukan!`,
    })
  }

  res.status(200).json({
    status: 'Success Get One',
    message: `Tour dengan ID:'${Number(req.params.id)}' berhasil ditemukan`,
    data: { tour },
  })
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(
    `${__dirname}/data/json/simple-tours.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).send('Error writing/create to file')
        return
      }

      res.status(201).json({
        status: 'Success Create',
        message: `Berhasil membuat tour baru dengan ID:'${Number(newId)}' `,
        data: {
          tour: newTour,
        },
      })
    }
  )
}

const patchTour = (req, res) => {
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
        res.status(500).send('Error writing/patch to file')
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
}

const deleteTour = (req, res) => {
  const tourId = Number(req.params.id)
  const tourIndex = tours.findIndex((tour) => tour.id === tourId)

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'Failed to delete',
      message: `ID:'${Number(
        req.params.id
      )}' yang ingin anda hapus tidak ditemukan!`,
    })
  }

  tours.splice(tourIndex, 1)

  fs.writeFile(
    `${__dirname}/data/json/simple-tours.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).send('Error writing/delete to file')
        return
      }

      // Return a success response
      res.status(204).json({
        status: 'Success Delete',
        message: `Tour dengan ID:'${Number(req.params.id)}' berhasil dihapus`,
        data: null,
      })
    }
  )
}

// USER CONTROLLERS
const getUsers = (req, res) => {
  res.status(200).json({
    status: 'Not ready',
    message: 'Masih disiapin routesnya',
  })
}
const getUser = (req, res) => {
  res.status(200).json({
    status: 'Not ready',
    message: 'Masih disiapin routesnya',
  })
}
const createUser = (req, res) => {
  res.status(200).json({
    status: 'Not ready',
    message: 'Masih disiapin routesnya',
  })
}
const patchUser = (req, res) => {
  res.status(200).json({
    status: 'Not ready',
    message: 'Masih disiapin routesnya',
  })
}
const deleteUser = (req, res) => {
  res.status(200).json({
    status: 'Not ready',
    message: 'Masih disiapin routesnya',
  })
}

// ROUTES TOURS
const tourRouter = express.Router()

tourRouter.route('/').get(getTours).post(createTour)
tourRouter.route('/:id').get(getTour).patch(patchTour).delete(deleteTour)

app.use('/api/v1/tours', tourRouter)

// ROUTES USERS
const userRouter = express.Router()

userRouter.route('/').get(getUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(patchUser).delete(deleteUser)

app.use('/api/v1/users', userRouter)

// SERVER
const port = 3000

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
