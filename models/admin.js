const mongoose = require("mongoose")

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

                return value.match(re)
            },
            message: "Please enter a valid email address"
        },
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.length > 7
            },
            message: "Please enter a password with atleast 8 chars long"
        },
    },

    address: {
        type: String,
        default: ""
    },

    type: {
        type: String,
        default: "admin"
    }
})

const Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin