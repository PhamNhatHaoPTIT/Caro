const lodash = require('lodash');
const helper  =require('../../helper/Helper.js');
const create = (req, res) => {
    const body = req.body;
    req.app.models.room.createRoom(body).then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(401).json(err);
    });
}

const update = (req, res) => {
    const roomId = lodash.get(req, 'body.room_id');
    const guest = lodash.get(req, 'body.guest');
    const guestId = lodash.get(req, 'body.guest_id');
    req.app.models.room.updateRoom(roomId, guest, guestId).then((data) => {
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(401).json(err);
    });
}


const demo =  async (req, res) => {
    let data = await req.app.models.room.findRoomById(4);
    console.log("here")
    return res.status(200).json(data);
}

module.exports = { update, create, demo };