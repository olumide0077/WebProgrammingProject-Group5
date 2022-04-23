const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.json({message:"work in progress"})
} )

const brandRouter = require("./routes/brands")
app.use("/brands",brandRouter)

const customerRouter = require("./routes/customers")
app.use("/customers",customerRouter)

const orderRouter = require("./routes/orders")
app.use("/orders",orderRouter)

const paymentRouter = require("./routes/payments")
app.use("/payments",paymentRouter)

const prodRouter = require("./routes/products")
app.use("/products",prodRouter)

const userRouter = require("./routes/users")
app.use("/users",userRouter)


app.listen(port, () => console.log("Listening on port:" +port))
