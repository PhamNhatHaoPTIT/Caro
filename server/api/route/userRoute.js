userController = require('../controller/userController.js');

module.exports.register = function(app){
    app.route('/register').post(userController.userRegister);
}

module.exports.login = function(app) {
    app.route('/login').post(userController.userLogin);
}

module.exports.user = function(app) {
    app.route('/user/:id').get(userController.getUser);
}