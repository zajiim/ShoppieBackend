const express = require("express")
const UserModel = require("../../../../models/user")
const bcrypt = require("bcryptjs")

const authRouter = express.Router()

authRouter.post("/api/signup", async(req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        
        if (password!== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        const existingUser = await UserModel.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                message: "User with same email already exists"
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
    
        let user = new UserModel({
            name,
            email,
            password: hashedPassword,
            type: "user"
        });
        user = await user.save();
        res.json(user);
    } catch(e) {
        res.status(500).json({
            error: e.message
        });
    }
});



module.exports = authRouter