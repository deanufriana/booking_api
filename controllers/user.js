const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const fs = require('fs')
const { SECRET_KEY } = process.env

exports.login = async (req, res) => {

    const response = {
        success: false,
        resdata: [],
        reserror: {}
    }

    const { email, password } = req.body

    User
        .findOne({
            where: { email }
        }).then(async result => {

            if (!result) {
                response.reserror = { msg: 'Username atau password tidak ditemukan' }
                res.json(response)
                return
            }

            const comparePassword = await bcrypt.compare(password, result.password)

            if (!comparePassword) {
                response.reserror = { msg: 'Username atau password tidak ditemukan' }
                res.json(response)
                return
            }
            console.log(result.dataValues)
            jwt.sign(result.dataValues, SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
                if (err) {
                    console.log(err)
                }
                response.success = true
                response.resdata = { ...result.dataValues, token }
                res.json(response)
            });

        }).catch(err => {
            response.success = false
            response.error = { msg: err.errors[0].message }
            res.json(response)
        })
}

exports.register = async (req, res) => {

    const response = {
        success: false,
        resdata: [],
        reserror: {}
    }
    const { path, destination, mimetype } = req.file
    const { email, password } = req.body
    const secretPassword = await bcrypt.hashSync(password, 12)

    User
        .create({ email, password: secretPassword })
        .then(result => {

            const new_path = `${destination}/users/${result.id}.${mimetype.split('/')[1]}`
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
            response.error = { msg: err.errors[0].message }
            res.json(response)
        })
}