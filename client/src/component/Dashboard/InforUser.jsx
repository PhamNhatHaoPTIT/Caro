import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {  Card,Col,Row } from 'react-bootstrap';



class InforUser extends Component{
    
    render(){

        return(
            
        <Card  className="infor-user" >
            <Card.Header>
                <Row >
                    <Col>
                        <img ></img>
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
                        Win:{this.props.userInfor.win_game} 
                    </Col>
                    <Col>
                        Total:{this.props.userInfor.total_game} 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Point:{this.props.userInfor.point} p
                    </Col>
                    <Col>
                        WinRate:{(this.props>0) ? (this.props.userInfor.win_game / this.props.userInfor.total_game*100).toFixed(2) : 0}%
                    </Col>
                </Row>
            </Card.Body>
        </Card>
         
        )
    }
}





export default (InforUser);
