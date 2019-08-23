import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {  Card } from 'react-bootstrap';
import UserInfor from './UserInfor'
import {connect} from "react-redux"

class GameInfor extends Component{

    
    render(){
        return(
            
        <Card  className="game-infor" >
            <Card.Header>
                {this.props.canGo===true? "Your turn" : "Wait to your turn"}
            </Card.Header>
            <Card.Body>
                <Card className="bet-point">Bet point: {JSON.parse(localStorage.getItem('gameUserInfor')).bet_point} p</Card>
                <UserInfor 
                    username={JSON.parse(localStorage.getItem('gameUserInfor')).host}
                    src={"https://i.pinimg.com/564x/0e/f3/88/0ef388a7c15a72578a8bdaef6665696a.jpg"}>

                </UserInfor>
                <UserInfor 
                    username={JSON.parse(localStorage.getItem('gameUserInfor')).guest}
                        src={"https://i.pinimg.com/564x/81/a2/54/81a2541db762d74e3c753e17c5960eeb.jpg"}>

                </UserInfor>

            </Card.Body>
        </Card>
         
        )
    }
}

function mapStateToProps(state){

    return{
        canGo: state.boardGame.canGo,
    }
}


export default connect(mapStateToProps)(GameInfor)


