const express = require("express")
const AdminModel = require("../../../models/admin")
const bcrypt = require("bcryptjs")

const authRouter = express.Router()

authRouter.post("/api/admin/signup", async(req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await AdminModel.findOne({email})
        if(existingUser) {
            return res.status(400).json({
                message: "User with same email already exists"
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)
    
        let admin = new AdminModel({
            name,
            email,
            password: hashedPassword,
            type: "admin"
        })
        admin = await admin.save()
        res.json(admin)
    } catch(e) {
        res.status(500).json({
            error: e.message
        })
    }
    

})


module.exports = authRouter