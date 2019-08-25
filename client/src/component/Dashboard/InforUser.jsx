import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {  Card,Col,Row } from 'react-bootstrap';
import { Icon } from 'antd';



class InforUser extends Component{
    
    render(){

        return(
            
        <Card  className="infor-user" >
            <Card.Header>
                <Row >
                    <Col>
                        <img id="avatar" alt=''></img>
                    </Col>
                </Row>
                <Row >
                    <Col>
                       <p> {this.props.userInfor.username}</p>
                    </Col>
                </Row>
            </Card.Header> 

            <Card.Body>
                <Row>
                    <Col>
                         <p> Win:{this.props.userInfor.win_game} </p>
                    </Col>
                    <Col>
                        <p> Total:{this.props.userInfor.total_game} </p> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>   Point:{this.props.userInfor.point} </p>
                    </Col>
                    <Col>
                        <p>  WinRate:{(this.props.userInfor.win_game>0) ? (this.props.userInfor.win_game / this.props.userInfor.total_game*100).toFixed(2) : 0}% </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
         
        )
    }
}





export default (InforUser);
