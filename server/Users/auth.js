var express = require('express')
var router = express.Router()
const auth_controller = require('./auth_controller')

router.post('/login',auth_controller.login)

router.use(auth_controller.check_token) // verifica 1o se o token está correto
router.get('/user',auth_controller.user_data)

module.exports= router