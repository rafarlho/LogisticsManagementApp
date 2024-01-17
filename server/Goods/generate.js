const mongoose = require('mongoose')
const Good = require('./good')
const { faker } = require('@faker-js/faker')

mongoose.connect('mongodb://127.0.0.1:27017/logistic_app')

async function createGoods() {
    for(let i = 0 ; i < 30; i++) {
        let g = new Good({
            id:faker.string.alphanumeric({length:6}),
            description:faker.commerce.productDescription()
        })
        try {
            await g.save()
            console.log('Succesfuly generated ',g.id)
                
        } catch (error) {
            console.log('Error generating user: ',err)
        }
    }
}

createGoods().then(()=>{
    mongoose.disconnect()
    console.log('OK')
})