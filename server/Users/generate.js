const mongoose = require('mongoose')
const User = require('./user')
const { faker } = require('@faker-js/faker')

mongoose.connect('mongodb://127.0.0.1:27017/logistic_app')

async function createUsers() {
    for(let i = 0; i< 25;i++) {
        let u = new User({
            id:faker.string.alphanumeric({length:4}),
            password:faker.internet.password(),
            firstName:faker.person.firstName(),
            lastName:faker.person.lastName(),
            type:faker.number.int({min:0,max:2})
        })
        try {
            await u.save()
            console.log('Succesfuly generated ' + u.id + " " + u.type)
                
        } catch (error) {
            console.log('Error generating user: ',err)
        }
    }
}

createUsers().then(()=> {
    mongoose.disconnect()
    console.log('OK')
})