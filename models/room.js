const Sequalize = require('sequelize')
const sequalize = require('../utils/database')

const Room = sequalize.define('room', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    room_name: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    room_capacity: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    photo: {
        type: Sequalize.STRING
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

module.exports = Room