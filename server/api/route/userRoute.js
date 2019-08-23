userController = require('../controller/userController.js');
const middleware = require('../middleware/middleware.js');
module.exports.register = function(app){
    app.route('/register').post(userController.userRegister);
}

module.exports.login = function(app) {
    app.route('/login').post(userController.userLogin);
}

