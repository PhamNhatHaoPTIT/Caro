const lodash = require('lodash');

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


const getRoom = async (req, res) => {
    let data = await req.app.models.room.getAllRoom();
    return res.status(200).json(data);
}

module.exports = { update, create, getRoom };