import lodash from 'lodash';
import Store from '../store/Store'
import * as indexAction from '../action/index'
import * as helper from '../helper/Helper'

export default class Connection {

    constructor(){
        this.store = Store;
        this.ws = null;
        this.isConnection = false;
        this.username ='';
        this.connectServer();
    }

    decodeMessage(message) {
        let mess;
        mess = JSON.parse(message);
        return mess;
    }

    sendMessage(header, data){
        let message = {};
        message.header = header;
        message.data = data;
        const isConnection = this.isConnection;
        if(isConnection){
            const mess = JSON.stringify(message);
            this.ws.send(mess);
        }
    }

    sendAuthentication(){
        this.sendMessage("authenticated",JSON.parse(localStorage.getItem('token')))
        this.username = JSON.parse(localStorage.getItem('userInfor')).username;
    }

    sendCreateRoom(roomInfor){
        this.sendMessage("create_room",roomInfor);
    }

    sendJoinRoom(roomInfor){
        localStorage.setItem('roomInfor',JSON.stringify(roomInfor))
        this.sendMessage("join_room",roomInfor);
    }

    sendPlayGame(turnInfor){
        this.sendMessage("play_game",turnInfor);
    }

    sendChatMessage(chatMess){
        this.sendMessage("chat",chatMess);
    }

    sendResultGame(result){
        this.sendMessage("game_result",result);
    }


    handleCreateRoom(data){
        localStorage.setItem("roomInfor",JSON.stringify(data))
        if(data.host !== JSON.parse(localStorage.getItem('userInfor')).username)
            this.store.dispatch(indexAction.createNewRoom(data));

    }

    handleJoinRoom(data){
        this.store.dispatch(indexAction.deleteRoom({id: data.id,host: data.host}));

        if(data.host ===  this.username || data.guest === this.username)    
        {
            
            const gameUserInfor ={
                host: data.host,
                guest: data.guest,
                bet_point: data.bet_point,
                room_id: data.id,
                value: 1,
            }
    
            
            if(data.host === this.username){
                alert(data.guest+" is join");
            }
            this.store.dispatch(indexAction.createGameUserInfor(gameUserInfor));
            localStorage.setItem("gameUserInfor",JSON.stringify(gameUserInfor));


        }

        
    }



    handlePlayGame(data){
        data["canGo"] =true;
        this.store.dispatch(indexAction.playTurn(data));
    }

    handleChat(data){
        this.store.dispatch(indexAction.createMessage(data));
    }

    handleResultGame(data){
        console.log("result game "+JSON.stringify(data))
        this.store.dispatch(indexAction.createResultGame(data))

        //alert("You lose");


    }

    handleMessage(message){
        const header = lodash.get(message, 'header');
        const data = lodash.get(message,'data');
        switch(header){
            case 'create_room':
                this.handleCreateRoom(data);
                break;
            case 'join_room':
                this.handleJoinRoom(data);
                break;
            case 'play_game':
                this.handlePlayGame(data);
                break;

            case 'chat':
                this.handleChat(data);
                break;
            case 'game_result':
                this.handleResultGame(data);
                break;    

            default:
                break;
        }
    }




    connectServer(){
        const ws = new WebSocket('ws://localhost:3001');
        this.ws = ws;
        ws.onopen = ()=>{
            console.log("connect server")
            this.isConnection = true;
            this.sendAuthentication();
        };
        
        ws.onmessage = (event) =>{
            const message = this.decodeMessage(event.data);
            this.handleMessage(message);
        }

        ws.onclose = () =>{
            console.log("disconnect");
            this.isConnection = false;

        }


    }


    disconnectServer(){
        this.ws.close();
    }
}