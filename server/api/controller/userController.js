const lodash = require('lodash');

const userLogin = function(req, res) {
    const body = req.body;
    req.app.models.user.login(body).then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(401).json(err);
    });
}

const logout = (req, res) => {
    const userId = lodash.get(req, 'body.userId');
    req.app.models.user.logout(userId).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(403).json(err);
    });
}

const userRegister = (req, res) => {
    const body = req.body;
    req.app.models.user.createUser(body).then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(400).json(err);
    })
}

module.exports = { userLogin, userRegister };