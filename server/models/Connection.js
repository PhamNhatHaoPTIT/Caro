const { OrderedMap } = require('immutable');
const { ObjectId } = require('mongodb');
const lodash = require('lodash');
const token = require('../models/Token.js');

class Connection {

    constructor(app) {
        this.app = app;
        this.listConnections = new OrderedMap();
        this.model();
    }

    decodeMessage(message) {
        let mess;
        mess = JSON.parse(message);
        return mess;
    }

    sendMessage(ws, message) {
        const mess = JSON.stringify(message);
        ws.send(mess);
    }

    sendAllUserOnline(message) {
        this.listConnections.forEach((connection) => {
            let ws = connection.ws;
            this.sendMessage(ws, message);
        });
    }
    
    handleAuthenticated(ws) {
        const message = {
            header: 'authenticated',
            data: 'success connected websocket server'
        }
        this.sendMessage(ws, message);
    }

    handleCreateRoom(socketId ,data, clientConnection) {
        this.app.models.room.createRoom(socketId, data).then((room) => {
            const message = {
                header: 'create_room',
                data: room
            };
            // client receive 'create_room' message -> show new room game in front end
            clientConnection.room_id = lodash.get(room, 'id');
            this.sendAllUserOnline(message);
        }).catch((err) => {
            console.log("error: ", err);
        });
    }

    handleJoinRoom(socketId, data, clientConnection) {
        this.app.models.room.updateRoom(socketId ,data.room_id,data.guest,data.guest_id).then((room) => {
            const message = {
                header: 'join_room',
                data: room
            };
            clientConnection.room_id = data.room_id;
            // client receive 'join_room' message -> hide game room because room is played by 2 others player
            this.sendAllUserOnline(message);
        }).catch((err) => {
            console.log("error: ", err);
        });
    }

    playGame(room, userId, x, y) {
        let message;
        if(userId === lodash.get(room, 'host_id')) {
            // send to 2 player
            message = {
                header: 'play_game',
                data:
                {
                    x: x,
                    y: y,
                    value: 1                      // 1 -> host play -> X symbol
                }
            }
            this.sendMessage((this.listConnections.get(lodash.get(room, 'guest_socket'))).ws, message);
        } else {
            // send to 2 player
            message = {
                header: 'play_game',
                data:
                {
                    x: x,
                    y: y,
                    value: 2                      // 2 -> guest play -> O symbol
                }
            }
            this.sendMessage((this.listConnections.get(lodash.get(room, 'host_socket'))).ws, message);
        }
    }

    async handlePlayGame(data) {
        const userId = lodash.get(data, 'user_id');
        const roomId = lodash.get(data, 'room_id');
        const x = lodash.get(data, 'x');
        const y = lodash.get(data, 'y');

        await this.app.models.room.findRoomById(roomId).then((room) => {
            this.playGame(room, userId, x, y);
        }).catch((err) => {
            
        });
    }

    async handleChat(data) {
        const roomId = lodash.get(data,'room_id');
        const sender = lodash.get(data,'sender');
        const content = lodash.get(data, 'content');
        await this.app.models.room.findRoomById(roomId).then((room) => {
            const message = {
                header: 'chat',
                data:
                {
                content: content,
                sender: sender
                }
            }
            if(sender === lodash.get(room, 'host')) {
                this.sendMessage((this.listConnections.get(lodash.get(room, 'guest_socket'))).ws,message); 
            } else this.sendMessage((this.listConnections.get(lodash.get(room, 'host_socket'))).ws,message);
        }).catch((err) => {

        });
    }

    async saveCache(listTop) {
        for(let i = 0; i < listTop.length; i++) {
            await this.app.models.user.savePlayerInRedis(listTop[i].point, listTop[i].username);
        }
    }

    async handleTopPlayer(host, guest) {
        let checkRoom = await this.app.models.user.checkListTopPlayer();
        let listTop;
        if(checkRoom == 0) {
            listTop = await this.app.models.user.getTop();              // get top 5 player in mongo db
            await this.saveCache(listTop);
        } else {
            listTop = await this.app.models.user.getListTopPlayer();             // get list top in redis
        }
        for(let i = listTop.length - 1 ; i >= 0; i--) {
            if(host == lodash.get(listTop[i], 'username') || guest == lodash.get(listTop[i], 'username')) {
                await this.app.models.user.deleteCache(); 
                listTop = await this.app.models.user.getTop();              // get top 5 player in mongo db
                await this.saveCache(listTop);
                const message = {
                    header: 'rank',
                    data: listTop
                }
                this.sendAllUserOnline(message);
            }
        }
    }

    async handelGameResult(data) {
        const roomId = lodash.get(data,'room_id');
        const sender = lodash.get(data,'sender');
        const result = lodash.get(data, 'result');

        const room = await this.app.models.room.findRoomById(roomId);
        const message = {
            header: 'game_result',
            data:
            {
                result: result
            }
        }
        let winner = "";
        if(sender == room.host)                       // host win or draw
        {
            if(result === 'lose') {                // always send loss message
                winner = sender;
                await this.app.models.user.updateUser(room.host_id, 'win', room);
                await this.app.models.user.updateUser(room.guest_id, 'lose', room);
                await this.handleTopPlayer(room.host, room.guest);            // check and update list top player for winner
            } else {
                await this.app.models.user.updateUser(room.host_id, 'draw', room);
                await this.app.models.user.updateUser(room.guest_id, 'draw', room);
            }
            this.sendMessage((this.listConnections.get(room.guest_socket)).ws,message);
        } else {                                      // guest win or draw
            if(result === 'lose') {
                winner = sender;
                await this.app.models.user.updateUser(room.host_id, 'lose', room);
                await this.app.models.user.updateUser(room.guest_id, 'win', room);
                await this.handleTopPlayer(room.host, room.guest);            // check and update list top player for winner
            } else {
                await this.app.models.user.updateUser(room.host_id, 'draw', room);
                await this.app.models.user.updateUser(room.guest_id, 'draw', room);
            }
            this.sendMessage((this.listConnections.get(room.host_socket)).ws,message);
        }

        const game = {
            host: room.host,
            guest: room.guest,
            create_time: room.create_time,
            result: result,
            winner: winner,
            bet_point: room.bet_point
        }
        this.app.models.game.createGame(game);
        await this.app.models.room.deleteRoom(roomId).then((data) => {
            console.log('room: ' + roomId + ' finished play');
        }).catch((err) => {
            console.log('err delete room: ' + err);
        });
    }


    handelMessage(socketId, header, data) {
        let clientConnection;
        switch (header) {
            case 'authenticated':
                clientConnection = this.listConnections.get(socketId);
                clientConnection.userId = data;
                clientConnection.isAuthenticated = true;
                this.handleAuthenticated(clientConnection.ws);
                let message = {
                    header: 'user_online',
                    data: clientConnection.userId,
                }
                this.sendMessage(clientConnection.ws, message);
                break;
            case 'logout':
                clientConnection = this.listConnections.get(socketId);
                break;
            case 'create_room':
                    clientConnection = this.listConnections.get(socketId);
                    this.handleCreateRoom(socketId, data, clientConnection);
                    break;
            case 'join_room':
                    clientConnection = this.listConnections.get(socketId);
                    this.handleJoinRoom(socketId, data, clientConnection);
                    break;
            case 'play_game':
                this.handlePlayGame(data);
                break;
            case 'chat':
                this.handleChat(data);
                break;
            case 'game_result':
                this.handelGameResult(data);
            default:
                break;
        }
    }

    model() {
        this.app.wss.on('connection', (ws) => {
            const socketId = new ObjectId().toString();
            const clientConnection = {
                _id: socketId,
                ws: ws,
                userId: null,
                room_id: ''
            };
            this.listConnections = this.listConnections.set(socketId, clientConnection);

            ws.on('message', async (msg) => {
                const messageClient = this.decodeMessage(msg);
                console.log("client send message: ", msg);

                let tokenObj = lodash.get(messageClient, 'token');
                if(tokenObj === undefined) {
                    const data = lodash.get(messageClient, 'data');
                    tokenObj = data.token;
                }
                //verify token
                await token.verifyToken(tokenObj).then((result) => {
                    const header = lodash.get(messageClient, 'header');
                    const data = lodash.get(messageClient, 'data');
                    this.handelMessage(socketId, header, data);
                }).catch((err) => {
                    console.log('unauthentican');
                    const connection = this.listConnections.get(socketId);
                    if (connection) {
                        let message = {
                            header: "unauthenticated",
                            data: "403",
                        }
                        this.sendMessage(connection.ws, message);
                    }
                })
            })

            ws.on('close', async () => {
                console.log("client disconnected: ", socketId);
                const connection = this.listConnections.get(socketId);
                if(!connection){
                    return;
                }

                await this.app.models.room.findRoomById(connection.room_id).then( async (room) => {
                    console.log('in room: ' + JSON.stringify(room));
                    const message = {
                        header: 'game_result',
                        data:
                        {
                            result: 'win'
                        }
                    }
                    if(lodash.get(room, 'host_socket') === socketId) {
                        const data = {
                            room_id: connection.room_id,
                            sender: room.guest,
                            result: 'lose'
                        }
                        await this.handelGameResult(data);
                        this.sendMessage((this.listConnections.get(room.guest_socket)).ws, message);
                    } else {
                        const data = {
                            room_id: connection.room_id,
                            sender: room.host,
                            result: 'lose'
                        }
                        await this.handelGameResult(data);
                        this.sendMessage((this.listConnections.get(room.host_socket)).ws, message);
                    }
                }).catch((err) => {

                });
                this.listConnections = this.listConnections.remove(socketId);
            })
        });
    }
}

module.exports = Connection;
