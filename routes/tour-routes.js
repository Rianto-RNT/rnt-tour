const express = require('express')

const tourController = require('./../controllers/tour-controller')

const router = express.Router()

router.param('id', tourController.checkID)

router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.checkBody, tourController.createTour)
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour)

module.exports = router
