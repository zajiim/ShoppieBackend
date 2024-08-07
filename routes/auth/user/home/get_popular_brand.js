const express = require("express")
const userRouter = express.Router()
const userMiddleware = require("../../../../middlewares/auth")
const Product = require("../../../../models/products")


userRouter.get("/api/popularBrand/:brand", userMiddleware, async(req, res) => {
    try {
        const { brand } = req.params
        const limit = 10

        const products = await Product.find({brand}).limit(limit)

        const status = products.length > 0 ? "success" : "no products found"

        res.json({
            status,
            totalProducts: products.length,
            products
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


module.exports = userRouter