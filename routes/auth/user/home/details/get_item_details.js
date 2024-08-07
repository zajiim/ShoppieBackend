const express = require("express")
const userRouter = express.Router()
const userMiddleware = require("../../../../../middlewares/auth")
const Product = require("../../../../../models/products")

userRouter.get("/api/get-product/:productId", userMiddleware, async(req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findOne({ productId })

        if(!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' })
        }

        res.json({
            status: 'success', 
            product
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = userRouter