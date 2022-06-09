const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    des: {
        type: String
    },
    desDetails: {
        type: String
    },
    taste: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    },
})
const productModel = mongoose.model('products', productSchema)
module.exports = productModel