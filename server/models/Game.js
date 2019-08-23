

class Game {
    constructor(app) {
        this.app = app;
    }

    createGame(game) {
        const db = this.app.db;
        return new Promise((resolve, reject) => {
            db.collection('games').insertOne(game, (err, info) => {
                if(err) {
                    reject(info);
                }
                resolve({message: 'Game saved'});
            });
        });
    }

}

module.exports = Game;