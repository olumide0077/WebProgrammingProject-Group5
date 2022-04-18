const express = require("express")
const router = express.Router()
router.get("/",(req,res)=>{
    res.json({
        inCart: 0,
        tag: "Craft",
        price: 100,
        Description: 'fADV charge warm jacket M',
        images: "Screenshot (11).jpeg"
    })
})

router.post("/new",(req,res)=>{
    res.json("adding a new product")
})

router.get("/:id",(req,res) =>{
    res.json("look for product with id "+req.params.id)
} )

module.exports = router