const Bracelet = require('../Models/Bracelet');
const User = require('../Models/User');
const Tools = require('./ToolsController');

module.exports = {
    create: async (req, res) => {
        console.log(req.params);
        const {couleur, version, model} = req.body;
        await Bracelet.create({
            model,
            couleur,
            version
        }, function (error, bracelet) {
            if (error) {
                return res.send(error);
            }
            return res.send(bracelet);
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
        const bracelet = await Bracelet.find()
        return res.send(bracelet)
    },

    userByBracelet: async (req, res) => {
        const {id} = req.params;
        const bracelet = await Bracelet.findById(id).populate('User');
        res.send(bracelet);
    },

    findByID: async (req, res) => {
        const {id} = req.params;
        await Bracelet
            .findById(id)
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

}
