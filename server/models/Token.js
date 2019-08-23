const jwt = require('jsonwebtoken');
const privateKey = 'secret';

const createToken = (username) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ data: username }, privateKey, { expiresIn: 60*60*24 }, (err, token) => {
            return err ? reject(err) : resolve(token);
        });           
    })
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, (err, decoded) => {
            return err ? reject(err) : resolve(decoded);
        });
    });
}

module.exports = { createToken, verifyToken }