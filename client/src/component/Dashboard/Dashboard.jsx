import React, { Component } from "react";
import "./Dashboard.css"
// import DashboardContainer from "../../container/DashBoardContainer";
import RoomList from "./RoomList"
import InforUser from "./InforUser"
import Rank from "./Rank"
import {connect} from 'react-redux';
import {Container,Col,Row } from 'react-bootstrap';
import * as helper from '../../helper/Helper'
import Api from '../../api/Api'
import Axios from "axios";
import * as indexAction from '../../action/index'



class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            userInfor:JSON.parse(localStorage.getItem('userInfor')),
            rankItems:this.props.rankItems,
        }
    }


    componentDidMount(){
        const api = new Api();

        // get infor user
        api.get('user/'+JSON.parse(localStorage.getItem('userInfor'))._id,
           ).then(response=>{
            localStorage.setItem('userInfor',JSON.stringify(response.data))
            this.setState({userInfor:response.data})
            console.log("res "+ JSON.stringify(response.data));

        }).catch(err =>{
            console.log("get user infor err "+ err);

        })

        // get rank
        api.get('user',
        ).then(response=>{
            response.data.map(rank => this.props.createRankUser(rank))

        }).catch(err =>{
            console.log("get rank user  err "+ err);

        })

    }

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
                      <InforUser userInfor={this.state.userInfor}></InforUser>
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
        userInfor: state.userInfor,
        rankItems: state.rankItems,


    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        createRankUser: rankItems => dispatch(indexAction.createRankUser(rankItems))
    }
 }





export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

