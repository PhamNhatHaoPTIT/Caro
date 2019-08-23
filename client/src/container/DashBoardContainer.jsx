import React, {Component} from 'react';
import RoomList from '../component/Dashboard/RoomList'
import InforUser from "../component/Dashboard/InforUser"
import Rank from "../component/Dashboard/Rank"

import {connect} from 'react-redux';
import {Container,Col,Row } from 'react-bootstrap';



class DashBoardContainer extends Component{
    render(){
        return(
            (
                <Container>
                <Row>
                    <Col  xl={8} lg={12} md={12} sm={12} >
                        <RoomList roomItems={this.props.roomItems}>
                        </RoomList>
                    </Col>
                    <Col xl={4} lg={12} md={12} sm={12}>
                      <InforUser userInfor={this.props.userInfor}></InforUser>
                      <Rank rankItems={this.props.rankItems}></Rank>
                    </Col>
                </Row>
                </Container>

            )
        );
    }
}



function mapStateToProps(state){
    return{
        roomItems: state.roomItems,
        userInfor: state.userInfor,
        rankItems: state.rankItems,


    }
}



export default connect(mapStateToProps)(DashBoardContainer);