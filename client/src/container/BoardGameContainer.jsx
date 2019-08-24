import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Board from '../component/BoardGame/Board';
import GameInfor from '../component/BoardGame/GameInfor'
import {connect} from 'react-redux';
import {Container,Col,Row } from 'react-bootstrap';
// import {bindActionCreators} from 'redux'
// import { func } from 'prop-types';

class BoardGameContainer extends Component{



    render(){

        return(
            <Container>
            <Row>
                <Col  xl={8} lg={12} md={12} sm={12} >
                    <Board 
                        board={this.props.board}
                      
                       >
                    </Board>
                </Col>
                <Col xl={4} lg={12} md={12} sm={12}>
                    <GameInfor></GameInfor>
                </Col>
            </Row>
            </Container>
         
        )
    }
}

function mapStatetoProps(state){
    console.log("x"+state.boardGame.board);
    return{
      board: state.boardGame.board,

    }
}


// function mapDispatchtoProps(dispatch){
//     return bindActionCreators({
//         clickCell : clickCell
//     },dispatch);
// }
  
export default connect(mapStatetoProps)(BoardGameContainer);
