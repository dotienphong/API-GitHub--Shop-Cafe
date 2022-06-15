const express = require('express')
const paymentModel = require('../model/payment')
const app = express()

//GET ALL
app.get("/payment", async (req, res) => {
    const payment = await paymentModel.find({})
    try {
        res.send(payment)
    } catch (err) {
        res.status(500).send(err)
    }
})

//ADD NEW payment
app.post("/payment", async (req, res) => {
    const payment = new paymentModel(req.body)
    try {
        await payment.save()
        res.send(payment)
    } catch (err) {
        res.status(500).send(err)
    }
})


//DELETE (sửa)
app.delete("/payment/:id", async (req, res) => {
    try {
        const payment = await paymentModel.findByIdAndDelete(req.params.id, req.body)
        if (!payment) res.status(404).send("No Item Found")
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

// UPDATE(Check Status - for Shipper)
app.patch("/payment/:id", async (req, res) => {
    const ID = await paymentModel.findById(req.params.id)
    if (!ID) return res.status(404).send("payment not found...")
    try {
        const updatePayment = await paymentModel.findByIdAndUpdate(req.params.id, {
            status: true
        })
        res.status(200).send(updatePayment)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = app
