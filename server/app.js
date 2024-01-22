const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const cors= require('cors')
const goods_controller = require('./Goods/goods_controller.js')
const requests_controller = require('./Requests/requests_controller.js')
const auth = require('./Users/auth')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/logistic_app')

console.log("Running the api...")
app.use('/auth',auth)
app.use('/goods',goods_controller);
app.use('/requests',requests_controller);

app.use(async (req,res,next) => {
    res.status(404).send('Not found')
})

app.listen(3000)