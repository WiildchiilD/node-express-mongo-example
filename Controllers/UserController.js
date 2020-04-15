const User = require('../Models/User');

module.exports = {
    create : async (req, res) =>{
        const { type , firstname, lastname , email , password } = req.body;
        await User.create({
            type , firstname, lastname , email , password
        }, function(error , user) {
            if (error){
                return res.send(error);
            }
            return res.send(user);
        });

    },

    find : async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },

    findAll : async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },

    braceletsByUser : async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(id).populate('Bracelet');

        res.send(user.bracelets);
    }


}
