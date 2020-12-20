const Sequalize = require('sequelize')
const sequalize = require('../utils/database')

const User = sequalize.define('user', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "format tidak sesuai dengan email"
            },
        }
    },
    password: {
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

module.exports = User