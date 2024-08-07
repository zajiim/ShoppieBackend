const express = require("express")
const helloRouter = express.Router()

helloRouter.get("/api/admin/hello", (req, res) => {
    res.send({
        message: "Hello"
    })
})

module.exports = helloRouter