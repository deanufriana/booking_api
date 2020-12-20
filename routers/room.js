const express = require('express')
const router = express.Router()
const room_controller = require('../controllers/room')
const is_auth = require('../utils/is_auth')

router.get('/list_room', room_controller.list_room)
router.post('/add_room', is_auth, room_controller.add_room)

module.exports = router