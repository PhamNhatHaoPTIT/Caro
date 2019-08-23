const lodash = require('lodash');
const helper = require('../helper/Helper.js');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const token = require('../models/Token.js');

class User {
    constructor(app) {
        this.app = app;
    }

    checkUser(user, callback = () => {}) {
        const username = lodash.get(user, 'username', '');
        const password = lodash.get(user, 'password', '');

        let check = true;

        if (!helper.isUserNameAndPassword(username) || username.length < 1 || username.length > 20) {
            check = false;
        }

        if (!helper.isUserNameAndPassword(password) || password.length < 1 || password.length > 20) {
            check = false;
        }

        if (!check) {
            const err = "Invalid value";
            return callback({
                error_message: err,
                message: err
            }, null);
        }

        // check username is exist in db
        this.app.db.collection('users').findOne({"username": username}, (err, result) => {
            if (err || result) {
                const err = "Username is already exist";
                return callback({
                    error_message: err,
                    message: err
                }, null);
            }
            const hashPassword = bcrypt.hashSync(password, 10);
            const userFormat = {
                username: username,
                password: hashPassword,
                win_game: 0,
                total_game: 0,
                point: 100
            }
            return callback(null, userFormat);
        });
    }

    createUser(user) {
        const db = this.app.db;
        return new Promise((resolve, reject) => {
            this.checkUser(user, (err, user) => {
                if (err) {
                    return reject(err);
                }
                db.collection('users').insertOne(user, (err, info) => {
                    if (err) {
                        return reject({
                            error_message: "Do not save user.",
                            message: "Do not save user."
                        });
                    }
                    
                    // create token
                    token.createToken(lodash.get(user, 'username')).then((tokenObj) => {
                        let data = {};
                        lodash.unset(user, 'password');
                        data.token = tokenObj;
                        data.user = user;
                        return resolve(data);
                    }).catch((err) => {
                        return reject({
                            error_message: "Login failed",
                            message: "Login failed"
                        })
                    })
                });
            });
        });
    }

    findUserByUsername(username, callback = () => {}) {
        this.app.db.collection('users').findOne({username: username}, (err, result) => {
            if (err || !result) {
                const err = "User not found";
                return callback({
                    error_message: err,
                    message: err
                }, null);
            }
            return callback(null, result);
        })
    }


    login(user) {
        const username = lodash.get(user, 'username');
        const password = lodash.get(user, 'password');
        return new Promise((resolve, reject) => {
            if (!username || !password || !helper.isUserNameAndPassword(username) || !helper.isUserNameAndPassword(password)) {
                const err = "Invalid value";
                return reject({
                    error_message: err,
                    message: err
                });
            }

            this.findUserByUsername(username, (err, result) => {
                if (err) {
                    return reject({
                        error_message: "Login failed",
                        message: "Login failed"
                    });
                }
                const hashPassword = lodash.get(result, 'password');
                const check = bcrypt.compareSync(password, hashPassword);
                if (!check) {
                    return reject({
                        error_message: "Login failed",
                        message: "Login failed"
                    });
                }
                // create token
                token.createToken(lodash.get(result, 'username')).then((tokenObj) => {
                    let data = {};
                    lodash.unset(result, 'password');
                    data.token = tokenObj;
                    data.user = result;
                    return resolve(data);
                }).catch((err) => {
                    return reject({
                        error_message: "Login failed",
                        message: "Login failed"
                    })
                })
            });
        })
    }

    logout(userId){
        return new Promise((resolve, reject) => {
            return resolve("Logout success");
        })
    }


     async  findUserById(id){
        try{
            const userId = new ObjectId(id);
            let user = await this.app.db.collection('users').findOne({_id:userId});
            console.log("find user by id: " + id + " userId: " + userId + "\t"+JSON.stringify(user) );
            return user;

        }catch(e){

            const err = "User not found";
            console.log("find user "+err);

        }
    }

}

module.exports = User