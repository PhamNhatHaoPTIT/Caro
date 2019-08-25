import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Signup.css';
import {Container,Row} from 'react-bootstrap';
import Logo from './../Logo/Logo'
import CardSignup from './CardSignup.jsx'



class Signup extends Component {

      render() {
        return (
            <Container>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Row className="justify-content-md-center">
                        <Logo></Logo>
                   
                </Row>
                <Row className="justify-content-md-center">
                        <CardSignup>
                        </CardSignup>
                </Row>
                <br></br>
                <br></br>
            </Container>
        );
      }
}



export default Signup;

