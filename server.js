require('dotenv').config();
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer({ dest: 'assets/uploads' })
const session = require('express-session')
const sequalize = require('./utils/database')

// List of Route
const room = require('./routers/room')
const user = require('./routers/user')
const booking = require('./routers/booking')

// List of model
const User = require('./models/user')
const Room = require('./models/room')
const Booking = require('./models/booking')

app.use(session({
  secret: process.env.SECRET_KEY,
  cookie: { secure: false, expires: 28800000, httpOnly: false },
  resave: false,
  saveUninitialized: false
}))

app.use(upload.single('photo'))
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json())

app.use(room)
app.use(user)
app.use(booking)

Booking.belongsTo(User, { contraints: true, onDelete: "CASCADE", foreignKey: 'user_id' })
User.hasMany(Booking, {
  foreignKey: {
    name: 'user_id'
  }
})

Booking.belongsTo(Room, { contraints: true, onDelete: "CASCADE", foreignKey: 'room_id' })
Room.hasMany(Booking, {
  foreignKey: {
    name: 'room_id'
  }
})

sequalize.sync({ alter: true })

server.listen(process.env.PORT || 5000)