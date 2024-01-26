const mongoose = require('mongoose')
const Good = require('./Goods/good')
const User = require('./Users/user')
const Request = require('./Requests/request')

const fs = require('fs').promises;

mongoose.connect('mongodb://127.0.0.1:27017/logistic_app')

async function createGoodsFromJson() {
    try {
        const jsonData = await fs.readFile('./utils/data/goods.json', 'utf8');
        const goodsData = JSON.parse(jsonData)
        for(let i = 0 ; i < goodsData.length; i++) {
            const item = goodsData[i]
    

            const g = new Good({id:item.id,description:item.description})

            await g.save()
        }
    } catch(error) {
        console.log("Error generating goods: ",error)
    }
}

async function createUsersFromJson() {
    try {
        const jsonData = await fs.readFile('./utils/data/users.json', 'utf8');
        const usersData = JSON.parse(jsonData)
        for(let i = 0 ; i < usersData.length; i++) {
            const user = usersData[i]
    

            const u = new User({
                id:user.id,
                password:user.password,
                firstName:user.firstName,
                lastName: user.lastName,
                type: user.type
            })

            await u.save()
        }
    } catch(error) {
        console.log("Error generating users: ",error)
    }
}
async function createRequestsFromJson() {
    try {
        const jsonData = await fs.readFile('./utils/data/requests.json', 'utf8');
        const requestsData = JSON.parse(jsonData)
        for(let i = 0 ; i < requestsData.length; i++) {
            const request = requestsData[i]
            
            const goodsId = request.goodsId.map(item => ({
                id:item.id,
                quantity:item.quantity
            }))

            const r = new Request({
                id:request.id,
                goodsId:goodsId,
                status:request.status,
                emitter:request.emitter,
                handler: request.handler,
                latestUpdate:request.latestUpdate
            })

            await r.save()
        }
    } catch(error) {
        console.log("Error generating requests: ",error)
    }
}

async function generatData() {
    try {
        await Promise.all([createUsersFromJson(),createGoodsFromJson(),createRequestsFromJson()])
        console.log('Users, goods and requests generated.')
    } catch (error) {
        console.log("Error generating data. " ,error)
    }
    finally {
        mongoose.disconnect()
    }
}


generatData()