const mongoose = require('mongoose')
const Schema = mongoose.Schema


var requestSchema = new Schema({
    id:Number,
    goodsId:[{id:String,quantity:Number}],
    status:Number,
    emitter:String,
    handler:String,
    lastestUpdate:Date,
})

module.exports = mongoose.model("Request",requestSchema)