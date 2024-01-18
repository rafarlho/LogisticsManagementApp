var express = require('express')
var router = express.Router()
var User = require('./user')

router.get('/',async function(req,res) {
    try {
        await User.find().exec() 
            .then((goods)=>{
                res.status(200).send(goods)
            })
            .catch((error)=>{
                res.status(500).send("Unable to retrieve Users: ",error)
            })
    } catch (error) {
        res.status(404).send("Unable to find User. Make sure it exists. ",error)
    }
})

module.exports = router;