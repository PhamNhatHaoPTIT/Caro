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
                'guest_socket': socketId,
                'prev_turn': 'null'
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

   getAllRoom() {
        
        const scanner = new redisScan(client);
        let listRoom = new ArrayList;
        let listRoomName = new ArrayList;

        scanner.eachScan('room:*', (matchingKeys) => {
            // Depending on the pattern being scanned for, many or most calls to
            // this function will be passed an empty array.
            if (matchingKeys.length) {
                for(let i = 0; i < matchingKeys.length; i++) {
                        // console.log(lodash.get(data, 'id'));

                        console.log("get all room  "+matchingKeys[i])
                        listRoomName.add(matchingKeys[i])
   
                        // var tmp = JSON.stringify(this.findRoomByRoomName(matchingKeys[i]))
                        // console.log("room "+ tmp[10])
                }
            }
        }, (err, matchCount) => {
            if (err) throw(err);
         
            // matchCount will be an integer count of how many total keys
            // were found and passed to the intermediate callback.

   
            
            console.log(`Found ${matchCount} keys.`);
            return listRoomName
        });
    }

    findRoomByRoomName(roomName) {
        client.hgetall(roomName, function(err, rep){
            if(err || !rep) {
                const message = {
                    error: 'room not found'
                }
                return ; 
            }
            console.log(rep);
            return JSON.stringify(rep);
        });
    }

}

module.exports = Room;
