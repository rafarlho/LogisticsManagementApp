const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserType =Object.freeze({

    "Factory Worker":0,
    "Warehouse Operator":1,
    "Production Line Manager":2
}) 

var userSchema = new Schema({
    id:String,
    password:String,
    firstName:String,
    lastName:String,
    type:Number
})

module.exports = mongoose.model("User",userSchema);