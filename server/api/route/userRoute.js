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

module.exports.top = function(app) {
    app.route('/user').get(userController.getTopUser);
}

module.exports.demo = function(app) {
    app.route('/demo').get(userController.demo);
}