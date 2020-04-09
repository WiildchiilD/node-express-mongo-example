const {MongoClient, ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'store'

let db

const init = () =>
    MongoClient.connect(connectionUrl, {useNewUrlParser: true}).then((client) => {
        db = client.db(dbName)
    })

module.exports = {init}
