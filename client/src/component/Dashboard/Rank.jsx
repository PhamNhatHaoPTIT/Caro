import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card,Row,Col } from 'react-bootstrap';
import RankItem from './RankItem'




class Rank extends Component{

    createRankItemList(){
        let listItem = this.props.rankItems.map(
            (eachRankItem,index) =>{
                return(
                    <RankItem key={index} username={eachRankItem.username} point={eachRankItem.point} avatar={eachRankItem.avatar}></RankItem>
                );
            }
        );
        
        return listItem;

    }
    
    render(){
        return(
        <Card  className="ranking" >
            <Card.Header>
                <Row className="justify-content-md-center">
                    <Col>Top 5 Ranking</Col>
                </Row>
            </Card.Header> 

            <Card.Body>
                {this.createRankItemList()}

            </Card.Body>
        </Card>
        )
    }
}




export default (Rank);

