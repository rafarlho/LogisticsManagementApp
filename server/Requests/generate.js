/*
Goods ids:
[    'VwksYn', 'wQZw5k', 'ZzQ64u', '3Ozav5', 'Pp7e5M', 'PZRVxD', 'JRa7e3', 'M2a2nv', 'Boow2S',
    'iOCm1M', 'jfx2xE', 'MLAzOj', 'VESokO', 'QsvrrK', 'DRvCGq', 'ZrIPSk', '1Ft0tO', 'LtiJxe',
    'VQn8Qz', 'YNqHSp', 'hl6NGL', 'dYiQ9i', 'kcKffW', 'tvyk11', 'jkb7J1', 'C7y1Rg', 'vDC2Gh',
    'GUy5a9', 'O2aPxX', 'gp7Acc'
]
---------------------------------------------------------------------
Users type 0:
['a13a', '6pt0', 'AYq1', 'onGC', 'Erv6']
---------------------------------------------------------------------
Users type 1:
['yaqQ', 'KEzQ', 'ffTh', 'PUFE', 'q3Nr', 'AR0Y', 'rjIQ', 'MLKK', 'rwcS', 'prNk']
---------------------------------------------------------------------
Users type 2:
['JdCb', 'kge7', 'IpVs', 'IJP6', 'KPAm', '8Usu', 'AHCE', 'RwqY', '64aa','Qwe1']
*/
const mongoose = require('mongoose')
const Request = require('./request')
const { faker } = require('@faker-js/faker')

mongoose.connect('mongodb://127.0.0.1:27017/logistic_app')

const goodsArr = [    'VwksYn', 'wQZw5k', 'ZzQ64u', '3Ozav5', 'Pp7e5M', 'PZRVxD', 'JRa7e3', 'M2a2nv', 'Boow2S',
'iOCm1M', 'jfx2xE', 'MLAzOj', 'VESokO', 'QsvrrK', 'DRvCGq', 'ZrIPSk', '1Ft0tO', 'LtiJxe',
'VQn8Qz', 'YNqHSp', 'hl6NGL', 'dYiQ9i', 'kcKffW', 'tvyk11', 'jkb7J1', 'C7y1Rg', 'vDC2Gh',
'GUy5a9', 'O2aPxX', 'gp7Acc'
]
const usersType1 = ['yaqQ', 'KEzQ', 'ffTh', 'PUFE', 'q3Nr', 'AR0Y', 'rjIQ', 'MLKK', 'rwcS', 'prNk']
const usersType2 = ['JdCb', 'kge7', 'IpVs', 'IJP6', 'KPAm', '8Usu', 'AHCE', 'RwqY', '64aa','Qwe1']

async function createRequests() {
    for(let i = 0 ; i < 5 ; i++) {
        const goods = []
        for(let i = 0; i < Math.floor(Math.random() * 20); i++) {
            const temp = {id:faker.helpers.arrayElement(goodsArr),quantity:faker.number.int({min:1,max:50})}
            goods.push(temp) 
        }
        let r = new Request({
            id: faker.number.int(5000),
            goodsId:goods,
            status:0,
            emitter:faker.helpers.arrayElement(usersType1),
            handler:'',
            latestUpdate: faker.date.anytime(),
        })
        try {
            await r.save()
            console.log('Succesfuly generated ',r.id + " " + r.latestUpdate + " " + i)
                
        } catch (error) {
            console.log('Error generating user: ',error)
        }
    }
    for(let i = 0 ; i < 20 ; i++) {
        const goods = []
        for(let i = 0; i < Math.floor(Math.random() * 20); i++) {
            const temp = {id:faker.helpers.arrayElement(goodsArr),quantity:faker.number.int({min:1,max:50})}
            goods.push(temp) 
        }
        let r = new Request({
            id: faker.number.int(5000),
            goodsId:goods,
            status:faker.number.int({min:1,max:3}),
            emitter:faker.helpers.arrayElement(usersType1),
            handler:faker.helpers.arrayElement(usersType2),
            latestUpdate: faker.date.anytime()
        })
        try {
            await r.save()
            console.log('Succesfuly generated ',r.id + " " + r.latestUpdate + " " + i)
                
        } catch (error) {
            console.log('Error generating user: ',error)
        }
    }
}


createRequests().then(()=> {
    mongoose.disconnect()
    console.log('OK')
})