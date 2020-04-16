const Bracelet = require('../Models/Bracelet');
const User = require('../Models/User');
const History = require('../Models/History');

module.exports = {
    create: async (req, res) => {
        id = req.params.id;

        const bracelet = await Bracelet.findById(id);
        console.log(bracelet.user);
        var user = null;
        if (bracelet.user) {
            user = await User.findById(bracelet.user.id);
        }

        const {longitude, latitude} = req.body;

        var  history = await History.create({
            longitude : longitude,
            latitude : latitude,
            user: user === null ? undefined : user.id,
            bracelet:id
        });

        await history.save();

        return res.send(history);

    },

    createWithUserID: async (req, res) => {
        console.log(req.params);
        user = req.params;
        id = user.id;
        const {couleur, version} = req.body;
        const bracelet = await Bracelet.create({
            couleur,
            version,
            user: id
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
