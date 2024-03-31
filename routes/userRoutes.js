const express = require ('express')
const protectRoute = require('../middleware/protectRoutes')
const { getUsersList } = require('../controller/userController')

const router = express.Router()

router.post('/' ,protectRoute, getUsersList)

module.exports = router
