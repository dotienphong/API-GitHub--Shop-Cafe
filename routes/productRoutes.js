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
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body)

        try {
            const result = await productModel.save()
            console.log("product edit", result)
        } catch (err) {
            console.error("result save() error:", err)
        }
        await productModel.save(product)
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send(err)
    }
})

// app.patch((req, res) => {
//     const content = JSON.stringify(req.body)
//     fs.writeFile(`/coffeeShop/${req.params.id}.json`, content, (err) => {
//         if (err) {
//             console.log(err)
//             res.json({ Error: 'Error while writing content' })
//         }
//         res.json({ Success: 'Successfully updated' })
//     })
// })


module.exports = app
