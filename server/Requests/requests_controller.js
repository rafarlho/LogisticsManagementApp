var express = require('express')
var router = express.Router()
var Request = require('./request')

router.get('/',async function(req,res) {
    try {
        await Request.find().exec() 
            .then((goods)=>{
                res.status(200).send(goods)
            })
            .catch((error)=>{
                res.status(500).send("Unable to retrieve Requests: ",error)
            })
    } catch (error) {
        res.status(404).send("Unable to find Request. Make sure it exists. ",error)
    }
})

module.exports = router;