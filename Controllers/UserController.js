const User = require('../Models/User');

module.exports = {
    create : async (req, res) =>{
        const { type } = req.body;
        const user = await User.create({
            type
        })

        return res.send(user)
    },

    find : async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },

    braceletsByUser : async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(id).populate('Bracelet');

        res.send(user.bracelets);
    }


}
