const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/user')
const is_auth = require('../utils/is_auth')

router.post('/register', user_controller.register)
router.post('/login', user_controller.login)

module.exports = router