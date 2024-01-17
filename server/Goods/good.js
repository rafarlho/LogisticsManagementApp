const mongoose = require('mongoose')
const Schema = mongoose.Schema

var goodSchema = new Schema({
    id:String,
    description:String
})

module.exports = mongoose.model("Good",goodSchema)