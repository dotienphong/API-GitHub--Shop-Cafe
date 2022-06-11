const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    note: {
        type: String
    },
    total: {
        type: Number
    },
    productNamePayment: {
        type: Array
    },
    quantityPayment: {
        type: Array
    },
    status: {
        type: Boolean
    },
    fullTime: {
        type: String
    }
})
const paymentModel = mongoose.model('payments', paymentSchema)
module.exports = paymentModel