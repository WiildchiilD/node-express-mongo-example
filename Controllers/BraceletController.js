const Bracelet = require('../Models/Bracelet');

module.exports = {
    create: async (req, res) => {
        const {couleur, version} = req.body;
        const bracelet = await Bracelet.create({
            couleur,
            version,
        })

        return res.send(bracelet)
    },

    find: async (req, res) => {
        const bracelet = await Bracelet.find()
        return res.send(bracelet)
    },

    userByBracelet: async (req, res) => {
        const {id} = req.params;
        const bracelet = await Bracelet.findById(id).populate('User');
        res.send(bracelet.user);
    }

}
