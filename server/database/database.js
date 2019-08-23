const mongodbClient = require('mongodb').MongoClient;
const config = require('../config/config.js');

connect = () => {
    return new Promise((resolve, reject) => {
        mongodbClient.connect(config.database.url, config.database.option, (err, client) => {
            const database = client.db('caro_game');
            err ? reject(err) : resolve(database);
        });
    })
}

module.exports = { connect };