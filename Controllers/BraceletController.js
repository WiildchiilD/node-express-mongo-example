const Bracelet = require('../Models/Bracelet');
const User = require('../Models/User');

module.exports = {
    create: async (req, res) => {
        console.log(req.params);
        const { couleur, version, model} = req.body;
        await Bracelet.create({
            model,
            couleur,
            version
        }, function(error , bracelet) {
            if (error){
                return res.send(error);
            }
            return res.send(bracelet);
        });

    },

    createWithUserID: async (req, res) => {
        console.log(req.params);
        user = req.params;
        id = user.id;
        const { couleur, version} = req.body;
        const bracelet = await Bracelet.create({
            couleur,
            version,
            user:id
        });
        await bracelet.save();

        const userById = await User.findById(id);

        userById.bracelets.push(bracelet);
        await userById.save();

        return res.send(userById);
    },

    find: async (req, res) => {
        const bracelet = await Bracelet.find()
        return res.send(bracelet)
    },

    findAll: async (req, res) => {
        const bracelet = await Bracelet.find()
        return res.send(bracelet)
    },

    userByBracelet: async (req, res) => {
        const {id} = req.params;
        const bracelet = await Bracelet.findById(id).populate('User');
        res.send(bracelet);
    }

}
