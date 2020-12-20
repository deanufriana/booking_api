const express = require('express')
const router = express.Router()
const booking_controller = require('../controllers/booking')
const is_auth = require('../utils/is_auth')

router.post('/book_room', is_auth, booking_controller.book_room)
router.post('/check_in', booking_controller.check_in)

module.exports = router