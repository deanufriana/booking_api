const Room = require('../models/room')
const fs = require('fs')

exports.add_room = async (req, res) => {

    const response = {
        success: false,
        resdata: [],
        reserror: {}
    }

    const { room_name, room_capacity, photo } = req.body
    const { path, destination, mimetype } = req.file

    Room
        .create({ room_name, room_capacity })
        .then(result => {

            const new_path = `${destination}/rooms/${result.id}.${mimetype.split('/')[1]}`
            result.photo = new_path
            fs.rename(path, new_path, () => {
                result.save()
                response.success = true
                response.resdata = result
                res.json(response)
            })
        })
        .catch(err => {
            response.success = false
            response.reserror = { msg: JSON.stringify(err) }
            res.json(response)
        })
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