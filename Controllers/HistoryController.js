const Bracelet = require('../Models/Bracelet');
const User = require('../Models/User');
const History = require('../Models/History');

const openGeocoder = require('node-open-geocoder');


async function requestPositionByBracelet(id) {
    await History.findOne({
        bracelet: id
    }).sort([['createdAt', 'descending']])
        .populate("user bracelet")
        .then(history => {
            // console.log(history._id);
            return history;
        }).catch(err => {
            return undefined;
        });
}

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
            .end(async (err, res) => {
                //console.log(err);
                var place = "Unkwnown";
                if (err) {

                }

                place = res.display_name;
                let history = await History.create({
                    longitude: longitude,
                    latitude: latitude,
                    user: user === null ? undefined : user,
                    bracelet: id,
                    place: place
                });
                await history.save();
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
                // res.status(500).send({
                //     message: err.message
                // });

                res.status(500).json({
                    "error": "Could not retrieve history"
                });
            });

        if (bracelet) {

            var owner = null;
            if (bracelet.user) {
                owner = bracelet.user;
            } else {
                return res.status(404).send("[]");
            }

            await History.find({
                user: owner,
                bracelet: id
            })
                .select('id longitude latitude place createdAt@')
                .sort([['createdAt', 'descending']])
                .then(histories => {
                    res.send(histories);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
        } else {
            return res.status(404).send("[]");
        }
    },
    getAllLastPosition: async (req, res) => {

        // for each bracelet , find ONE , LAST , POSITION

        var result = [];


        const cursor = await Bracelet
            .find()
            .cursor();

        await cursor.eachAsync(async function (doc) {


            await History.findOne({
                bracelet: doc._id
            }).sort([['createdAt', 'descending']])
                .populate("user")
                .populate({
                    path: 'bracelet',
                    populate: {
                        path: 'model',
                        model: 'BModel'
                    }
                })
                .then(history => {
                    // console.log(history._id);
                    console.log("pushing " + history);
                    if (history != null)
                        result.push(history);
                }).catch(err => {
                    return undefined;
                });


            // let history = requestPositionByBracelet(doc._id)
            //     .then(b => {
            //         console.log(b);
            //     })
            //
            // console.log("pushing " + history);
            // result.push(history);

            // .then(history => {
            //     console.log("pushing " + history);
            //     result.push(history);
            // })
        }).then(done => {
            console.log("done");
            console.log(result);
            res.send(result);
        })

        // await Bracelet
        //     .find()
        //     .map(function (bracelet) {
        //         console.log(bracelet);
        //         bracelet.forEach(function (bracelet) {
        //             console.log(bracelet._id);
        //             requestPositionByBracelet(bracelet._id)
        //                 .then(history => {
        //                     console.log("PUSHING");
        //                     result.push(history)
        //                 })
        //         })
        //     }).then(done => {
        //         console.log(result);
        //         res.send("done");
        //     });


        // History
        //     .find()
        //     .distinct('bracelet', function (error, histories) {
        //         /* handle result */
        //         console.log(histories);
        //     });

        // cursor.map
        //
        // eachAsync(async function (doc) {
        //     requestPositionByBracelet(doc._id)
        //         .map(async history => {
        //             console.log(history);
        //             return history
        //         })
        // });
        //
        // console.log(result);

        // History.aggregate([
        //     // {$match:{'bracelet':state}},
        //     {$group: {"bracelet": doc._id}},
        //     {$sort: {createdAt: 1}}
        // ])
        //     .exec(function (err,result) {
        //         console.log(result);
        //     })

        // History.aggregate([
        //     // {$match:{'bracelet':state}},
        //     {$group: {_id: '$bracelet'}},
        //     {$sort: {createdAt: 1}}
        // ])
        //     .exec(function (err,result) {
        //         console.log(result);
        //     })

        //     .then(done => {
        //     console.log("returning");
        //     res.json(result);
        // })


        // .then(histories => {
        //     res.send(histories);
        // }).catch(err => {
        //     res.status(500).send({
        //         message: err.message
        //     });
        // });
    }

}
