import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Dashboard.css'
import {  Card, Col,Row } from 'react-bootstrap';


export default class RoomItem extends Component{

    constructor(props){
        super(props);

        this.state={
            username: this.props.username,
            point: this.props.point,
            avatar: this.props.avatar,
        }
    }
    
    render(){

        return(
            
        <Card  className="rank-item" >
                <Row>
                    <Col lg="2" sm="12">
                        <img  alt=''></img>
                    </Col>
                    <Col lg="10" sm="12"  >
                        <Card.Title>{this.state.username}</Card.Title>
                        <Card.Text>
                            {this.state.point} p
                        </Card.Text>
                    </Col>
                </Row>
        </Card>
         
        )
    }
}



