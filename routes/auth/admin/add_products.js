const express = require("express")
const adminRouter = express.Router()
const adminMiddleware = require("../../../middlewares/auth")
const Product = require("../../../models/products")

adminRouter.post("/api/admin/add-products", adminMiddleware, async(req, res) => {
    try {
        const { name, brand, description, quantity, price, category, images } = req.body

        let product = new Product({
            name,
            brand,
            description,
            quantity,
            price,
            category,
            images
        })

        product = await product.save()
        res.json(product)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})




module.exports = adminRouter