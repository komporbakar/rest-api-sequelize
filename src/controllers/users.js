const {
    StatusCodes
} = require("http-status-codes")
const bcrypt = require('bcrypt');
const {user} = require("../models");
const validator = require('validator');
const { createJWT } = require("../utils");

module.exports = {
    index: async (req, res) => {
        try {

        } catch (err) {
            console.log(err)
        }
    },
    signup: async (req, res, next) => {
        try {
            const {
                firstname,
                lastname,
                email,
                username,
                password,
                roles
            } = req.body
            if (!firstname || !lastname || !email || !username || !password) {
                res.status(StatusCodes.NOT_FOUND).json({
                    error: true,
                    message: 'Field has been required'
                })
            }

            const isStongPassword = validator.isStrongPassword(password)
            if (!isStongPassword) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: true,
                    message: 'password not strong'
                })
            }

            const hashPassword = bcrypt.hashSync(password, 10)

            const result = await user.create({
                firstName: firstname,
                lastname,
                email,
                username,
                roles,
                password: hashPassword
            })

            res.status(StatusCodes.CREATED).json({
                error: false,
                message: 'Created Succesfully',
                data: result
            })

        } catch (err) {
            next(err)
        }
    },
    signin: async(req, res, next) => {
        try {
            const { username, password } = req.body
            if(!username || !password) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: true,
                    message: 'Field has been required'
                })
            }
            const checkUsername = await user.findOne({where: {username: username}})
            if(!checkUsername){
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: true,
                    message: 'Invalid Credentials'
                })
            }
            
            const pass = bcrypt.compareSync(password, checkUsername.dataValues.password)
            if(!pass){
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: true,
                    message: 'Invalid Credentials'
                })
            }
            
            const data = {
                id: checkUsername.dataValues.id,
                email: checkUsername.dataValues.email,
                username: checkUsername.dataValues.username,
                roles: checkUsername.dataValues.roles
            }
            // console.log(checkUsername)
            const token = createJWT(data)

            return res.status(StatusCodes.OK).json({
                error: false,
                message: 'Login Success',
                token: token
            })

        } catch (err) {
            next(err)
        }
    }
}