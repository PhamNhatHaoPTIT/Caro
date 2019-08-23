import React, { Component } from "react";
import "./Dashboard.css"
import DashboardContainer from "../../container/DashBoardContainer";
import RoomList from "./RoomList"
import InforUser from "./InforUser"
import Rank from "./Rank"
import {connect} from 'react-redux';
import {Container,Col,Row } from 'react-bootstrap';
import Api from '../../api/Api'

class Dashboard extends Component{

    

    render(){
        return(
            (
                <Container>
                <Row>
                    <Col  xl={8} lg={12} md={12} sm={12} >
                        <RoomList>
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

const api = new Api();

function getUserInfor(){
    return new Promise((resolve,reject) =>{
        api.get('user/'+JSON.parse(localStorage.getItem('userInfor'))._id).then((response)=>{
            console.log(response.data)
            localStorage.setItem('userInfor',JSON.stringify(response.data.user))
            localStorage.setItem('token',JSON.stringify(response.data.token))

            this.props.addUserInfor(response.data.user);

            if(response.status===200)
                this.props.history.push({
                pathname: '/',
              })
                
        }).catch((err)=>{
            console.log("login err",err);
        })
    });
}

function mapStateToProps(state){
    // getUserInfor()
    var userInfor = JSON.parse(localStorage.getItem('userInfor'));
    
    return{
        userInfor: userInfor,
        rankItems: state.rankItems,


    }
}



export default connect(mapStateToProps)(Dashboard);

