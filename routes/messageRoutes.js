const express = require('express')
const {sendMessage , getMessage}  = require('../controller/messageController')
const protectRoute = require('../middleware/protectRoutes')

const router = express.Router()


router.post('/send/:id', protectRoute, sendMessage)
router.get('/get/:id', protectRoute,getMessage)


module.exports= router