const express = require("express")
const userRouter = express.Router()
const userMiddleware = require("../../../../middlewares/auth")
const Product = require("../../../../models/products")

userRouter.get("/api/get-all-products", userMiddleware, async(req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit)
        const products = await Product
        .find()
        .skip((page - 1) * limit)
        .limit(Number(limit))

        const status = products.length > 0 ? 'success' : 'no more products';

        res.json({
        status,
        currentPage: Number(page),
        totalPages,
        totalProducts,
        products
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = userRouter