import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './BoardGame.css';
import Board from './Board';
import GameInfor from './GameInfor'
// import BoardGameContainer from "../../container/BoardGameContainer";
import {Container,Col,Row } from 'react-bootstrap';
import ChatBox from './ChatBox'
import { Layout } from "antd";
import HeaderBar from '../HeaderBar/HeaderBar'

class BoardGame extends Component{

    render(){

        return(
            <main>
            <Layout>
                <HeaderBar></HeaderBar>
            </Layout>
            <br></br>
            
            <Container>
            <Row>
                <Col  xl={8} lg={12} md={12} sm={12} >
                    <Board >
                    </Board>
                </Col>
                <Col xl={4} lg={12} md={12} sm={12}>
                    <Col>
                        <GameInfor></GameInfor>
                    </Col>

                    <Col>
                        <ChatBox></ChatBox>
                    </Col>
                </Col>
            </Row>
            </Container>
            </main>
        )
    }
}




export default (BoardGame);


