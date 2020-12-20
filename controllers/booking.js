const Booking = require('../models/booking')
const Room = require('../models/room')
const smtp = require('../utils/smtp')
const User = require('../models/user')

exports.book_room = async (req, res) => {

    const response = {
        success: false,
        resdata: [],
        reserror: {}
    }

    const {
        user_id,
        room_id,
        total_person,
        note,
        booking_time,
    } = req.body

    const checkRoom = await Room.findOne({ where: { id: room_id } })
        .catch(err => {
            response.error = { msg: err.errors[0].message }
            res.json(err)
        })

    if (!checkRoom) {
        response.success = false
        response.error = { msg: 'room tidak ditemukan' }
        res.json(response)
        return
    }

    if (checkRoom.room_capacity > total_person) {
        response.success = false
        response.error = { msg: 'total orang tidak boleh lebih dari kapasitas ruangan' }
        res.json(response)
        return
    }

    const user = await User.findOne({ where: { id: user_id } })
        .catch(err => {
            response.error = { msg: err.errors[0].message }
            res.json(err)
        })

    if (!user) {
        response.success = false
        response.error = { msg: 'User tidak ditemukan' }
        res.json(response)
        return
    }

    Booking
        .create({ user_id, room_id, total_person, note, booking_time })
        .then(async result => {
            response.success = true
            response.resdata = result
            smtp(user.email, 'Pesanan tempat telah berhasil !', `anda telah memesan tempat pada tanggal ${booking_time}`)
            res.json(response)
        })
        .catch(err => {
            response.success = false
            response.error = { msg: err.errors[0].message }
            res.json(response)
        })
}

exports.check_in = async (req, res) => {
    const response = {
        success: false,
        resdata: [],
        reserror: {}
    }

    const {
        booking_id,
        check_in_time
    } = req.body


    const booking = await Booking
        .update({ check_in_time }, { where: { id: booking_id } })
        .catch(err => {
            response.error = { msg: err.errors[0].message }
            res.json(err)
        })

    const findBooking = await Booking
        .findOne({ where: { id: booking_id } })
        .catch(err => {
            response.error = { msg: err.errors[0].message }
            res.json(err)
        })

    const user = await User.findOne({ where: { id: findBooking.user_id } })
        .catch(err => {
            response.error = { msg: err.errors[0].message }
            res.json(err)
        })

    smtp(user.email, 'Check In', `anda telah check in`)

    response.success = true
    response.resdata = [{ msg: "check in berhasil" }]
    res.json(response)

}

exports.check_out = async (req, res) => {
    const response = {
        success: false,
        resdata: [],
        reserror: {}
    }

    const {
        booking_id,
        check_in_time
    } = req.body

    try {

        const booking = await Booking.findOne({ where: { id: booking_id } })
            .catch(err => {
                response.error = { msg: err.errors[0].message }
                res.json(err)
            })

        booking.check_out_time = check_in_time
        booking.save()

        response.success = true
        response.resdata = [{ msg: "check out berhasil" }]
        res.json(response)

    } catch (error) {
        response.error = { msg: 'Terjadi Kesalahan' }
        res.json(response)
    }
}

exports.list_room = async (req, res) => {

    const response = {
        success: false,
        resdata: [],
        reserror: {}
    }

    Room
        .findAll()
        .then(result => {
            response.success = true
            response.resdata = result
            res.json(response)
        })
        .catch(err => {
            response.success = false
            response.error = { msg: JSON.stringify(err) }
            res.json(response)
        })
}