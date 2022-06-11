const bodyParse = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const url = "mongodb+srv://dotienphong1993:Phong186@cluster0.ocjhu.mongodb.net/Shop-Cafe?retryWrites=true&w=majority"
const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')
const paymentRouter = require('./routes/paymentRoutes')
const port = process.env.PORT || 3001;
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Backend for Coffee Shop')
})

app.use(cors())
app.use(productRouter)
app.use(userRouter)
app.use(paymentRouter)

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || url, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => {
                console.log('Connected to database')
                app.listen(port, () => {
                    console.log("App is running on port " + port);
                });
            })
    } catch (error) {
        console.log('error connection to MongoDB:', error.message);
    }
};
connectToMongo()