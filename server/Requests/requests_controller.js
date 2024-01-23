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

router.post('/',async function(req,res) {
    try {
        let r = new Request({ 
            id: req.body.id,
            goodsId:req.body.goodsId,
            status:0,
            emitter:req.body.emitter,
            handler:'',
            latestUpdate: new Date()
        });
        await r.save();
        console.log("Success adding")
        res.status(200).send(r);
    } catch (error) {
        console.log('Something went wrong: ', error);
        res.status(500).send(error);
    }
})
router.patch('/oncollection',async function(req,res) {
    try {
        let r = await Request.findById(req.body._id)
        r.status = req.body.status
        r.handler = req.body.handler
        await r.save();
        console.log("Success editing")
        res.status(200).send(r);
    } catch (error) {
        console.log('Something went wrong: ', error);
        res.status(500).send(error);
    }
})

router.patch('/updatestatus',async function(req,res) {
    try {

        let r = await Request.findById(req.body._id)
        r.status = req.body.status
        await r.save();
        console.log("Success editing")
        res.status(200).send(r);
    } catch (error) {
        console.log('Something went wrong: ', error);
        res.status(500).send(error);
    }
})

module.exports = router;