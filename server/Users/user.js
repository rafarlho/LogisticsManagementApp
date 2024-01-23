const mongoose = require('mongoose')
const Schema = mongoose.Schema


var userSchema = new Schema({
    id:String,
    password:String,
    firstName:String,
    lastName:String,
    type:Number
})

module.exports = mongoose.model("User",userSchema);