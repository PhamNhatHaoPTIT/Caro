const roomController = require('../controller/roomController.js');
const middleware = require('../middleware/middleware.js');

module.exports.rooms = function(app) {
    app.use('/rooms', middleware.verify);
    app.route('/rooms', middleware.verify).post(roomController.create);

    app.route('/rooms', middleware.verify).put(roomController.update);
    
    app.route('/demo/:room_id').get(roomController.demo);
}

