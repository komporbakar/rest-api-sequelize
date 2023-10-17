const { StatusCodes } = require("http-status-codes")
const { verifyJWT } = require("../utils")

const Authorization = async(req, res, next) => {
    try {
        const auth = req.headers.authorization
    if(!auth){
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true,
            message: 'Invalid Authorization'
        })
    }
    const token = auth.split(" ")[1]
    
    const result = verifyJWT(token)
    
    if(result.data.roles !== 'admin'){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: true,
            message: 'FORBIDDEN'
        })
    }

    next()

    } catch (err) {
        next(err)
    }

}

module.exports = {Authorization}