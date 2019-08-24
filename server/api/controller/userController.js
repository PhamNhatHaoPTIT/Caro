const lodash = require('lodash');

const userLogin = function(req, res) {
    const body = req.body;
    req.app.models.user.login(body).then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(401).json(err);
    });
}

const userRegister = (req, res) => {
    const body = req.body;
    req.app.models.user.createUser(body).then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(400).json(err);
    });
}

const getUser = async (req, res) => {
    const userId = req.params.id;
    const user = await req.app.models.user.findUserById(userId);
    return res.status(200).json(user);
}

const getTopUser = async (req, res) => {
    const data = await req.app.models.user.getTop();
    return res.status(200).json(data);
}

const demo = async (req, res) => {
    let data = await req.app.models.user.deleteUserInRedis('save');
    console.log(data);
    return res.status(200).json('data');
}

module.exports = { userLogin, userRegister, getUser, getTopUser, demo };