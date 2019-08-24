const lodash = require('lodash');
const moment = require('moment');
const redis = require('redis');
const client = redis.createClient();
const redisScan = require('node-redis-scan');
const ArrayList = require('arraylist');


class Room {

    constructor(app) {
        this.app = app;
    }

    createRoom(socketId, room) {
        return new Promise((resolve, reject) => {
            const host = lodash.get(room, 'host');
            const hostId = lodash.get(room, 'host_id');
            const betPoint = lodash.get(room, 'bet_point');
            const createTime = moment().format();
            
            client.incr('id', function(err, id) {
                client.hmset('room:' + id, {
                    'id': id,
                    'host': host,
                    'host_id': hostId,
                    'host_socket': socketId,
                    'bet_point': betPoint,
                    'is_played': 0,
                    'create_time': createTime
                });
                const roomFormat = {
                    'id': id,
                    'host': host,
                    'bet_point': betPoint,
                    'create_time': createTime
                };
                return err ? reject(err) : resolve(roomFormat);
            });
        });
    }

    updateRoom(socketId, roomId, guest, guestId) {
        return new Promise((resolve, reject) => {
            // update room info
            client.hmset('room:' + roomId, {
                'is_played': 1,
                'guest': guest,
                'guest_id': guestId,
                'guest_socket': socketId
            });
            // get room to send all client
            client.hgetall('room:' + roomId, (err, object) => {
                if(err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(object);
                }
            });
        });
    }

    updatePlay(roomId, value) {
        client.hmset('room:' + roomId, {
            'prev_turn': value
        });
    }

    findRoomById(roomId) {
        return new Promise((resolve, reject) => {
            client.hgetall('room:' + roomId, function(err, rep){
                if(err || !rep) {
                    const message = {
                        error: 'room not found'
                    }
                    reject(message); 
                }
                resolve(rep);
            });
        });
    }

    findRoomByRoomName(roomName) {
        return new Promise((resolve, reject) => {
            client.hgetall(roomName, function(err, rep){
                if(err || !rep) {
                    const message = {
                        error: 'room not found'
                    }
                    reject(message); 
                }
                resolve(rep);
            });
        });
    }

    getAllRoomName() {
        const scanner = new redisScan(client);
        return new Promise((resolve, reject) => {
            scanner.scan('room:*', (err, matchingKeys) => {
                if (err) reject(err);        
                resolve(matchingKeys);
            });
        });
    }

    async getAllRoom() {
        let listRoom = new ArrayList;
        let listRoomName = await this.getAllRoomName();
        for(let i = 0; i < listRoomName.length; i++) {
            let room = await this.findRoomByRoomName(listRoomName[i]);
            if(room.is_played === '0') {
                listRoom.add(room);
            }
        }
        return listRoom;
    }

    deleteRoom(roomId) {
        return new Promise((resolve, reject) => {
            client.del('room:' + roomId, function(err, reply) {
                if(err) reject(err);
                resolve({message: 'room deleted'});
            });
        });
    }

}

module.exports = Room;
