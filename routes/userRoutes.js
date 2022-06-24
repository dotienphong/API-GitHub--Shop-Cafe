const express = require('express')
const app = express()
const userModel = require('../model/user')

//GET ALL
app.get("/users", async (req, res) => {
    const user = await userModel.find({})
    try {
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

//ADD NEW user
app.post("/users", async (req, res) => {
    const user = new userModel(req.body)
    try {
        await user.save()
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})


//DELETE (sửa)
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id, req.body)
        if (!user) res.status(404).send("No Item Found")
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = app
