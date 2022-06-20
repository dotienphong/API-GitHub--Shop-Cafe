const express = require('express')
const productModel = require('../model/product')
const app = express()

//GET ALL
app.get("/coffeeShop", async (req, res) => {
    const product = await productModel.find({})
    try {
        res.send(product)
    } catch (err) {
        res.status(500).send(err)
    }
})

//ADD NEW Product
app.post("/coffeeShop", async (req, res) => {
    const product = new productModel(req.body)
    try {
        await product.save()
        res.send(product)
    } catch (err) {
        res.status(500).send(err)
    }
})


//DELETE (sửa)
app.delete("/coffeeShop/:id", async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id, req.body)
        if (!product) res.status(404).send("No Item Found")
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

//UPDATE (sửa)
app.patch("/coffeeShop/:id", async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate({ _id: req.params.id }, { price: req.body.data.price })
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = app
