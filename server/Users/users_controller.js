var User = require('./user')

module.exports = {
    all: function(req,res) {

        User.find({}).lean().exec()
            .then((user => {
                if(!person) return res.status(404).json([])
                return res.status(200).json(user)
            }))
            
        .catch((error)=> {
            console.log(error)
            return res.status(500).json({error:'Internal Server Error'})
        })
       
    }
} 