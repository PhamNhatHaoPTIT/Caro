import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './BoardGame.css';
import { Card, InputGroup,FormControl ,Button} from 'react-bootstrap';
import * as indexAction from '../../action/index'
import {connect} from "react-redux"
import { withRouter } from "react-router-dom";
import ChatMessage from "../BoardGame/ChatMessage"
import "../Dashboard/scrollbar.css";



class Chatbox extends Component{
    constructor(props){
        super(props);

        this.state={

        }
    }



    handleClickEnter = ()=>{
        const value= document.getElementById("input-message").value;
        document.getElementById("input-message").value='';

        const chatMessInfor ={
            room_id: JSON.parse(localStorage.getItem('roomInfor')).id === undefined? JSON.parse(localStorage.getItem('roomInfor')).room_id : JSON.parse(localStorage.getItem('roomInfor')).id,
            sender: JSON.parse(localStorage.getItem('userInfor')).username,
            content: value
        }


        this.props.createMessage(chatMessInfor);

    }

    createChatMessageList(){
        if(typeof this.props.chatMessage !=="undefined"){
            let listMess = this.props.chatMessage.map(
                (each) =>{
                    return(
                        <ChatMessage sender={each.sender} content={each.content}></ChatMessage>
                        );
                }
            );
            
            return listMess;
    
        }

    }

    render(){
        return(
        <div>
        <Card className="card-chat-box" >
            <Card.Header>
               Chat Box
            </Card.Header>
            <Card.Body className="scrollbar scrollbar-near-moon">  
                {this.createChatMessageList()}

            </Card.Body> 
            <Card>
                <Card.Footer>
                <InputGroup className="mb-3 footer-card">
                        <FormControl id="input-message"
                        placeholder="Type something"
                        />
                        <InputGroup.Append>
                        <Button id="myBtn"  onClick={this.handleClickEnter} variant="outline-secondary">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
				</Card.Footer>
            </Card>



          </Card>
          </div>


        )
    }
   
}

function mapStateToProps(state){
    
    return{
        chatMessage: state.chatMessage,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createMessage: chatMessInfor => dispatch(indexAction.createMessage(chatMessInfor))
    }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Chatbox));

