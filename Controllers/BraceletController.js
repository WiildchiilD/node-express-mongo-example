const Bracelet = require('../Models/Bracelet');
const BModel = require('../Models/BModel');
const User = require('../Models/User');
const Tools = require('./ToolsController');

module.exports = {
    create: async (req, res) => {
        const {model} = req.body;

        // look for the model
        const modeli = await BModel.findById(model);

        await Bracelet.create({
            model : model ,
        }, function (error, bracelet) {
            if (error) {
                return res.send(error);
            }
            return res.send(bracelet);
        });

    },

    //@Deprecated
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
        const bracelet = await Bracelet.find().populate('model');
        return res.send(bracelet)
    },

    findAll: async (req, res) => {
        const bracelet = await Bracelet.find().populate('model user');
        return res.send(bracelet)
    },

    userByBracelet: async (req, res) => {
        const {id} = req.params;
        const bracelet = await Bracelet.findById(id)
            .populate('model user');
        res.send(bracelet);
    },

    findByID: async (req, res) => {
        const {id} = req.params;
        await Bracelet
            .findById(id)
            .populate('model')
            .then(bracelet => {
                res.status(200)
                    .send(bracelet);
            }).catch(error => {
                res.status(404).json({"error": "Bracelet not found"});
            });
    },

    unpairdBraceletWithID: async (req, res) => {
        const {braceletid} = req.params;

        await Bracelet.findById(braceletid)
            .then(bracelet => {
                bracelet.user = undefined;
                bracelet.save();
                res.status(200).json({"success": "Unpair operation did finish with success"});

            }).catch(error => {
                res.status(404).json({"error": "Bracelet not found"});
            })

    },

    affectBraceletToUser: async (req, res) => {
        const {braceletid, userid} = req.params;

        // get bracelet by id
        await Bracelet.findById(braceletid)
            .then(bracelet => {
                // found bracelet
                if (bracelet.user) { // bracelet have a user
                    // unauthorized op
                    res.status(401).json({"error": "The bracelet is already paired"});
                } else {
                    // bracelet have no user so free to go
                    User.findById(userid)
                        .then(user => {
                            bracelet.user = user;
                            bracelet.save();

                            console.log(user.email)
                            // send email to user
                            Tools.sendEmail(user.email);

                            res.status(200).json(
                                {"success": "Operation did finish with success, an email with QR Code has been sent to your account"}
                            );
                        }).catch(error => {
                        res.status(404).json({"error": "User not found"});
                    })

                }
            }).catch(error => {
                // bracelet does not exist
                console.log(error);
                console.log("CATCHING");
                res.status(404).json({"error": "Bracelet with given id not found"});
            });
    },

    // DO THROW ERROR
    createModel: async (req, res) => {
        console.log(req.body);
        const {couleur, version, name} = req.body;
        var url = "";
        if (version === 1) {
            url = "https://res.cloudinary.com/braceletapp/image/upload/v1588061566/Models/v1_elsfbh.png";
        } else if (version === 2) {
            url = "https://res.cloudinary.com/braceletapp/image/upload/v1588061566/Models/v4_vel7wg.png";
        } else if (version === 3) {
            url = "https://res.cloudinary.com/braceletapp/image/upload/v1588061567/Models/v3_uqxnib.png";
        } else if (version === 4) {
            url = "https://res.cloudinary.com/braceletapp/image/upload/v1588061566/Models/v4_vel7wg.png";
        }

        console.log(url);
        const bmodel = await BModel.create({
            name,
            couleur,
            version,
            url
        });

        await bmodel.save();
        return res.send(bmodel);
    },

    findAllModels : async (req, res) => {
        const models = await BModel.find();
        return res.send(models)
    },

}
