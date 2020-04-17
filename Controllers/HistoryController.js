const Bracelet = require('../Models/Bracelet');
const User = require('../Models/User');
const History = require('../Models/History');

const openGeocoder = require('node-open-geocoder');


module.exports = {
    create: async (req, response) => {
        id = req.params.id;

        const bracelet = await Bracelet.findById(id);
        console.log(bracelet.user);
        var user = null;
        if (bracelet.user) {
            user = bracelet.user;
        }

        const {longitude, latitude} = req.body;
        var place = "";

        openGeocoder()
            .reverse(parseFloat(longitude), parseFloat(latitude))
            .end((err, res) => {
                //console.log(err);
                if (err) {

                }
                console.log(res.display_name);
                let history = History.create({
                    longitude: longitude,
                    latitude: latitude,
                    user: user === null ? undefined : user,
                    bracelet: id,
                    place: res.display_name
                });

                response.send(history);
            });
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
        const histories = await History.find()
        return res.send(histories)
    },

    historyByBracelet: async (req, res) => {
        // return HISTORIES THAT CONTAIN THE USER
        const {id} = req.params; // bracelet ID

        const bracelet = await Bracelet
            .findById(id)
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });

        var owner = null;
        if (bracelet.user) {
            owner = bracelet.user;
        } else {
            return res.status(404).send("[]");
        }

        await History.find({
            user: owner,
            bracelet: id
        }).sort([['createdAt', 'descending']])
            .then(histories => {
                res.send(histories);
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    }

}
