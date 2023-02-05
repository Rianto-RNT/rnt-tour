const express = require('express')

const userController = require('./../controllers/user-controller')

const router = express.Router()

router.route('/').get(userController.getUsers).post(userController.createUser)
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser)

module.exports = router
