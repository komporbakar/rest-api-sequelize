const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

const createJWT = (payload) => {
    const token = jwt.sign({
        data: payload
    }, JWT_SECRET, {expiresIn: JWT_EXPIRES})

    return token
}


const verifyJWT = (token) => {
    const result = jwt.verify(token, JWT_SECRET)

    return result
}

module.exports = { createJWT, verifyJWT}