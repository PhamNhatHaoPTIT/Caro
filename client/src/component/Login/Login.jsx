import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Login.css';
import {Container,Row,Col} from 'react-bootstrap';
import Logo from './../Logo/Logo'
import CardLogin from './CardLogin'



class Login extends Component {

      render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                        <Logo></Logo>
                </Row>
                <Row className="justify-content-md-center">
                        <CardLogin>
                        </CardLogin>
                </Row>
            </Container>
        );
      }
}



export default Login;

