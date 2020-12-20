const Sequalize = require('sequelize')
const sequalize = require('../utils/database')

const Booking = sequalize.define('booking', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequalize.INTEGER,
        allowNull: false,
    },
    room_id: {
        type: Sequalize.INTEGER,
        allowNull: false,
    },
    total_person: {
        type: Sequalize.INTEGER,
        allowNull: false,
    },
    booking_time: {
        type: Sequalize.DATE,
        allowNull: false,
    },
    note: {
        type: Sequalize.TEXT,
        allowNull: false,
    },
    check_in_time: {
        type: Sequalize.DATE
    },
    check_out_time: {
        type: Sequalize.DATE
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    validate: {
        checkOutTimeMoreThanCheckIn() {
            if (this.check_out_time < this.check_in_time) {
                throw new Error('tanggal check in tidak boleh lebih dari tanggal check out');
            }
        },
    }
})

module.exports = Booking