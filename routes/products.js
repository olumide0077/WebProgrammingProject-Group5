const express = require("express")
const router = express.Router()
router.get("/",(req,res)=>{
    res.json("Product list")
})

router.post("/new",(req,res)=>{
    res.json("adding a new product")
})

router.get("/:id",(req,res) =>{
    res.json("look for product with id "+req.params.id)
} )

module.exports = router