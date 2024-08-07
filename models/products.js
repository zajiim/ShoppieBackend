const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const productsSchema = mongoose.Schema({

    productId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    brand: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ]
})

const Product = mongoose.model("Product", productsSchema)
module.exports = Product