import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Dashboard.css';
import { Card } from 'react-bootstrap';
import RoomItem from './RoomItem'
import Api from '../../api/Api'
import * as indexAction from '../../action/index'
import * as helper from '../../helper/Helper'
import {connect} from "react-redux"
import { withRouter } from "react-router-dom";
import "./scrollbar.css";

import { Modal, Button, Slider, InputNumber, Row, Col  } from 'antd';


class RoomList extends Component{

    state = {
        inputValue: 0,
        visible: false,
        username: JSON.parse(localStorage.getItem('userInfor')).username,
        username_id: JSON.parse(localStorage.getItem('userInfor'))._id,

        point: JSON.parse(localStorage.getItem('userInfor')).point,
        ModalText :'',
        confirmLoading: false,

    };
    
    onChange = value => {
        this.setState({
          inputValue: value,
        });
      };

    showModal = () => {
        this.setState({
          visible: true
        });
      };
    
    handleOk = () => { 
        const api = new Api();

 
        if(this.state.point>=this.state.inputValue){ 
            this.setState({
                confirmLoading: true,
            });

            const roomInfor ={
                token: JSON.parse(localStorage.getItem('token')),
                host_id: JSON.parse(localStorage.getItem('userInfor'))._id,
                host: this.state.username,
                bet_point: this.state.inputValue,
                
            }
            // this.props.createNewRoom(roomInfor);
            // localStorage.setItem("roomInfor",JSON.stringify(roomInfor))
            

            this.state.point-=this.state.inputValue;
            helper.addToLocalStorageObject("userInfor","point",this.state.point);

            
            setTimeout(() => {
                this.setState({
                  confirmLoading: false,
                  visible:false,
                });
              }, 2000);

            this.props.createNewRoom(roomInfor);
            this.props.history.push({
                pathname: '/game',
              })

        
            
        }   
        else{
            this.setState({
                ModalText: 'Your point is not enough',
              });
    
            console.log("input "+this.state.inputValue)
        }  



      };

    handleCancel = () => {
        console.log("Clicked cancel button");
        this.setState({
          visible: false
        });
      };
    
  
    createRoomItemList(){
        if(typeof this.props.roomItems !=="undefined"){
            let listItem = this.props.roomItems.map(
                (eachRoomItem) =>{
                    return(
                        <RoomItem id={eachRoomItem.id} host={eachRoomItem.host} point={eachRoomItem.bet_point} create_date={eachRoomItem.create_time}></RoomItem>
                    );
                }
            );
            
            return listItem;
    
        }

    }


    render(){
        const {inputValue, visible, ModalText, confirmLoading } = this.state;
        
        return(
            
        <Card className="card-room-list" >
            <Card.Header>
               <h3>Rooms</h3> 
               <div>
                    <Button type="primary" onClick={this.showModal}>
                    + New room
                    </Button>
                    <Modal 
                    title="Choose point to your room"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={confirmLoading}
                    >
                        <Row>
                            <p style={{ color: 'rgb(218, 110, 107)' }}>
                                {ModalText}
                            </p>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Slider
                                min={0}
                                max={2000}
                                onChange={this.onChange}
                                value={typeof inputValue === 'number' ? inputValue : 0}
                               />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                min={0}
                                max={2000}
                                style={{ marginLeft: 16 }}
                                value={inputValue}
                                onChange={this.onChange}
                                />
                            </Col>
                        </Row>               
                    </Modal>
                </div>
            </Card.Header>   
            <div className="scrollbar scrollbar-rare-wind roomList">

              {this.createRoomItemList()}
            </div>
          </Card>
         
        )
    }
}

function mapStateToProps(state){
    return{
        roomItems: state.roomItems,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createNewRoom: roomInfor => dispatch(indexAction.createNewRoom(roomInfor))
    }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RoomList));

