const User = require('../Models/User');
const Bracelet = require('../Models/Bracelet');

module.exports = {
    create: async (req, res) => {
        const {type, firstname, lastname, email, password} = req.body;
        await User.create({
            type, firstname, lastname, email, password
        }, function (error, user) {
            if (error) {
                return res.send(error);
            }
            return res.send(user);
        });

    },

    find: async (req, res) => {
        const {id} = req.params;
        await User.findById(id).then(user => {
            res.status(201).send(user);
        }).catch(error => {
            res.status(500).send(error);
        })
    },

    findAll: async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },

    braceletsByUser: async (req, res) => {
        const {id} = req.params;

        await Bracelet
            .find({
                user: id
            }).populate('model')

            .then(bracelets => {

                res.status(200).send(bracelets);
            }).catch(error => {
                res.status(200).json({});
            });

        // res.send(user.bracelets);
    },

    login: async (req, res) => {
        const {email, password} = req.body;
        await User.find({email: email, password: password}, function (error, resultSet) {
            if (error) {
                res.status(500).send(error);
            } else {
                if (resultSet.length > 0) {
                    res.status(201).send(resultSet[0]);
                } else {
                    res.status(404).json({"error": "not found"});
                }
            }
        });


    },

}
