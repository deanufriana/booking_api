const Sequalize = require('sequelize')
const { host, user, database, password } = process.env

const sequalize = new Sequalize(database, user, password, { host, dialect: 'mysql' })

module.exports = sequalize