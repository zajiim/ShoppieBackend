const jwt = require("jsonwebtoken")

const auth = async(req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        if(!token) res.status(401).json({message: "No auth token, access denied"})

        const isVerified = jwt.verify(token, "passwordKey")
        if(!isVerified) return res.status(401).json({message: "Token verification failed, access denied"})

        req.user = isVerified.id
        req.token = token
        next()

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = auth