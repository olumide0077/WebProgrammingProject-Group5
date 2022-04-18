const express = require('express')
const res = require('express/lib/response')
const app = express()

app.listen(3000)

app.get('/',(req,res) => {
    res.json({message:"work in progress"})
    res.send("muzail")
} )

const prodRouter = require("./routes/products")
app.use("/products",prodRouter)