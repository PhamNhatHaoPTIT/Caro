import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './BoardGame.css'
import {  Card, Col,Row } from 'react-bootstrap';


export default class UserInfor extends Component{
    constructor(props){
        super(props);

        this.state={
            username: this.props.username,
            src:this.props.src,
        }
    }
    
    render(){

        return(
            
        <Card  className="user-infor" >
                <Row>
                    <Col lg="12" sm="12" > 
                        <img class="avatar-user"></img>
                    </Col>
                    <Col lg="12" sm="12"  >
                        <Card.Title>{this.state.username}</Card.Title>
                             <img class="icon-user" src={this.state.src}></img>
                    </Col>
                </Row>
        </Card>
         
        )
    }
}



