const User = require('./user')
const jwt = require('jsonwebtoken')
const consts = require('../utils/consts')
const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server')

module.exports = {
    login: async function(req,res) {
        try {
            const password = req.body.password
            const id = req.body.id
            User.findOne({id:id}).lean().exec()
            .then((user) =>{
                    const auth_err = (password==='' || password===null || !user)
                    if(auth_err) {
                        return res.status(404).json({message:'Wrong email or password!'})}
                    else if(password === user.password) {
                        const token = jwt.sign({_id:user.id},consts.keyJWT,{expiresIn:consts.expiresJWT})
                        delete user.password
                        return res.json({...user,token:token})
                    }
                    else {
                        return res.status(404).json({message:'Wrong email or password!'})
                    }
                })
                .catch((err) => {
                    return res.status(500).json({message:'Server error',error:err})
                })  
        }catch(error) {
            console.log(error)
            res.status(500).json(['Error while logging in user!'])
        }
    },
    check_token: function(req,res,next) {
        const token = req.get('Authorization')
        if(!token) {
            return res.status(401).json({message:'Token not found'})
        }
        jwt.verify(token,consts.keyJWT,
            (err,decoded)=>{
                if(err || !decoded)  {
                    return res.status(401).json({message:'Wrong token. Authentication error!'})
                }
                next()
        })
    },

    user_data: function(req,res) {
        const token = req.get('Authorization')
        if(!token) {
            return res.status(401).json({message:'Token not found'})
        }
        jwt.verify(token,consts.keyJWT,
            (err,decoded)=>{
                const id = decoded._id
                User.findById(id).lean().exec()
                    .then((user) =>{
                        if(user) {
                            const tkn = jwt.sign({_id:user.id},consts.keyJWT,{expiresIn:consts.expiresJWT})
                            delete user.password
                            return res.json({...user,token:tkn})
                        }
                    })
                    .catch((err)=>{
                        
                        return res.status(500).json({message:'Error when triyng to fetch the user data',error:err})
                    })
                return res.status(500).json({message:"Error! ",err})
            })
    }
}