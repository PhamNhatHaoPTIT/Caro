import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Container,Col,Row } from 'react-bootstrap';
import moment from 'moment';
import Api from '../../api/Api'
import { withRouter } from "react-router-dom";
import {connect} from "react-redux"
import * as indexAction from '../../action/index'


class RoomItem extends Component{

    constructor(props){
        super(props);

        this.state = {
            host: this.props.host,
            point: this.props.point,
            room_id: this.props.id,
            create_date: this.props.create_date,
            isPlayed: this.props.isPlayed,
        }

        this.joinRoom = this.joinRoom.bind(this);
    }

    joinRoom(e){
        if(JSON.parse(localStorage.getItem('userInfor')).point <this.state.point)
            alert("Your point is not enough");


        else{
            const api = new Api();

            const joinInfor ={
                token: JSON.parse(localStorage.getItem('token')),
                room_id: this.state.room_id,
                guest_id: JSON.parse(localStorage.getItem('userInfor'))._id,
                guest: JSON.parse(localStorage.getItem('userInfor')).username
            }
            
            

            
            this.props.joinNewRoom(joinInfor);
            this.props.history.push({
                pathname: '/game',
                state:{
                    joinInfor: joinInfor
                }
            })
        }

    }

    render(){

        return(

        <Card  className="card-room-item" >
            <Container>
                <Row>
                <Col lg md sm="2" className="item item1">
                    <img  alt=''/>

                </Col>
                <Col   lg md sm="8" className="text item item1">
                    <Card.Title>Host: {this.state.host} </Card.Title>
                    <Card.Text>

                        {this.state.point} point -                         {moment(this.state.create_date).format('llll') }

                    </Card.Text>
                   
                </Col>
                <Col  lg md sm="2" >
                    <Button onClick={this.joinRoom} >Join</Button>
                </Col>
                </Row>
            </Container>
        </Card>
         
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        joinNewRoom: roomInfor => dispatch(indexAction.joinRoom(roomInfor))
    }
}


export default withRouter(connect(null,mapDispatchToProps)(RoomItem))

