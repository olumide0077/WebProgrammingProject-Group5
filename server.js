const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = process.env.port || 3000

app.get('/',(req,res) => {
    res.json({message:"work in progress"})
} )

const prodRouter = require("./routes/products")
app.use("/products",prodRouter)

app.listen(port, () => console.log("Listening on port:" +port))
