const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/json/simple-tours.json`)
)

// Middleware function to check tour ID
exports.checkID = (req, res, next, val) => {
  // Check if tour exists
  const tour = tours.find((tour) => tour.id === Number(val))

  if (!tour) {
    return res.status(404).json({
      status: 'Gagal',
      message: `ID:'${Number(
        req.params.id
      )}' yang anda cari tidak ditemukan! Silahkan periksa kembali ID yang anda input.`,
    })
  }

  // Attach tour to the request object
  req.tour = tour
  next()
}

// Middleware func to check body with name and price property
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Gagal',
      message:
        'Request Body yang anda minta wajib menyertakan properti Nama dan Harga.',
    })
  }
  next()
}

exports.getTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'Success Get All', result: tours.length, data: { tours } })
}

exports.getTour = (req, res) => {
  const tourId = Number(req.params.id)
  const tour = tours.find((tour) => tour.id === tourId)

  res.status(200).json({
    status: 'Success Get One',
    message: `Tour dengan ID:'${Number(req.params.id)}' berhasil ditemukan`,
    data: { tour },
  })
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(
    `${__dirname}/../data/json/simple-tours.json`,
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

exports.patchTour = (req, res) => {
  const tourId = Number(req.params.id)
  const tourIndex = tours.findIndex((tour) => tour.id === tourId)

  // Update the tour properties
  updatedTour = Object.assign({}, tours[tourIndex], req.body)
  tours[tourIndex] = updatedTour

  fs.writeFile(
    `${__dirname}/../data/json/simple-tours.json`,
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

exports.deleteTour = (req, res) => {
  const tourId = Number(req.params.id)
  const tourIndex = tours.findIndex((tour) => tour.id === tourId)

  tours.splice(tourIndex, 1)

  fs.writeFile(
    `${__dirname}/../data/json/simple-tours.json`,
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
