
const jsonwebtoken = require('jsonwebtoken')

module.exports = async function (req, res, next) {
    const getAuthorization = req.get('Authorization')
    if (!getAuthorization) {
        const error = new Error('Tidak Di Ijinkan Akses')
        error.statusCode = 401;
        return next(error)
    }
    const token = getAuthorization.split(' ')[1]
    let decodedToken;
    try {
        decodedToken = jsonwebtoken.verify(token, process.env.SECRET_KEY)
    } catch (err) {
        err.statusCode = 500
        return next(err)
    }

    if (!decodedToken) {
        const error = new Error('Tidak Di Ijinkan Akses')
        error.statusCode = 401;
        return next(error)
    }
    next()
}