const express = require("express")
const UserModel = require("../../../../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/api/signin", async(req, res) => {

    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user) {
            return res.status(400).json({
                msg: 'User with this email does not exist'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                msg: 'Incorrect password'
            });
        }

        const token = await jwt.sign({id: user._id}, "passwordKey");
        res.json({
            token, 
            ...user._doc
        });


    } catch(e) {
        res.status(500).json({error: e.message});
    }
    
})

authRouter.post("/api/tokenIsValid", async(req, res) => {
    try {
        const token = req.header("x-auth-token")
        if(!token) return res.json({
            status: false,
            message: "No token found"
        })
        
        const isTokenVerified = jwt.verify(token, "passwordKey")
        if(!isTokenVerified) return res.json({
            status: false,
            message: "The token is not valid, Please login once more"
        })

        const user = await UserModel.findById(isTokenVerified.id)
        if(!user) return res.json({
            status: false,
            message: "Verification failed."
        })

        return res.json({
            status: true,
            message: "Successfully logged in"
        })
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = authRouter