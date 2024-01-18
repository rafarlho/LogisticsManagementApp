var express = require('express')
var router = express.Router()
var Good = require('./good')

router.get('/',async function(req,res) {
    try {
        await Good.find().exec() 
            .then((goods)=>{
                res.status(200).send(goods)
            })
            .catch((error)=>{
                res.status(500).send("Unable to retrieve Goods: ",error)
            })
    } catch (error) {
        res.status(404).send("Unable to find Good. Make sure it exists. ",error)
    }
})

module.exports = router;