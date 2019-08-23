const User = require('./User.js');
const Room = require('./Room.js');
const Game = require('./Game.js');
const Connection = require('./Connection.js');

class Models {
    constructor(app) {
        this.app = app;
        this.user = new User(app);
        this.room = new Room(app);
        this.game = new Game(app);
        this.connection = new Connection(app);
    }
}

module.exports = Models;