import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './BoardGame.css';
import {connect} from 'react-redux';
import * as indexAction from '../../action/index'
import { Modal, Button } from 'antd';
import { withRouter } from "react-router-dom";



class Board extends Component{


   constructor(props){
      super(props);
      
    //   let host='';
    //   if(JSON.parse(localStorage.getItem('roomInfor')))
    //       host = JSON.parse(localStorage.getItem('roomInfor')).host;
  
      this.state = {
         board: this.props.board,
         gameEnded: false,
         host: this.props.roomInfor.host,
         canGo: this.props.canGo,
         result : this.props.result,
         visible: this.props.visible,
      }
   }

    checkHorizontal  (matrix, curRow, curCol, value)  {
      // di sang ben trai
      let countLeft = 0;
      let countRight = 0;
      // Di sang phia ben trai so voi vi tri hien tai
      for (let i = curCol; i >= 0; i--) {
          if (matrix[curRow*10+i] === value) {
              countLeft++;
          }
          else {
              break;
          }
      }
      // Di sang phia ben phai so voi vi tri hien tai
      for (let j = curCol + 1; j < 10; j++) {
          if (matrix[curRow*10+j] === value) {
              countRight++;
          }
          else {
              break;
          }
      }
      if (countRight + countLeft >= 5) {
          return 1;
      }
  }
  // Đếm số điểm theo phương thẳng đứng theo 2 hướng từ điểm hiên tại đi thẳng lên trên và
  // đi xuống dưới nếu cả 2 phía trên và dưới
  // tổng số ô cùng màu >=5 thì trả về giá trị true tức là chiến thắng
   checkVertically  (matrix, curRow, curCol, value)  {
      let i = curRow;
      let countUp = 0;
      let countDown = 0;
      for (let k = curRow; k < 10; k++) {
          if (matrix[k*10+curCol] === value)
              countDown++;
          else break;
      }
      for (let h = curRow - 1; h >= 0; h--) {
          if (matrix[h*10+curCol] === value)
              countUp++;
          else break;
      }
  
      if ((countUp + countDown >= 5))
          return 1;
  }
  // Kiểm tra theo phương đường chéo phụ
   checkDiagonal  (matrix, curRow, curCol, value)  {
      // kiểm tra theo phương đường chéo phía trên bên phải so với vị trí quân hiện tại
      let countRightUp = 0;
      let countLeftDown = 0;
      let temp1 = 0;
      let temp2 = 1;
      for (let i = curRow; i >= 0; i--) {
          if (matrix[i*10+curCol + temp1] === value) {
              countRightUp++;
              temp1++;
          }
          else break;
      }
      // kiểm tra theo phương đường chéo phía dưới bên trái so với vị trí quân hiện tại
      for (let j = curRow + 1; j < 10; j++) {
          if (matrix[j*10+curCol - temp2] === value) {
              countLeftDown++;
              temp2++;
          }
          else break;
      }
  
      if (countRightUp + countLeftDown >= 5)
          return 1;
  }
  // Kiểm tra theo phương đường chéo chính
   checkMainDiagonal  (matrix, curRow, curCol, value) {
      let countRightDown = 0;
      let countLeftUp = 0;
      let temp1 = 0;
      let temp2 = 1;
      // Kiểm tra theo phương đường chéo chính phía trên bên trái so với vị trí quân hiện tại
      for (let i = curRow; i >= 0; i--) {
          if (matrix[i*10 +curCol - temp1] === value) {
              countLeftUp++;
              temp1++;
          }
          else break;
      }
      // Kiểm tra theo phương đường chéo chính phía dưới bên phải so với vị trí quân hiện tại
      for (let j = curRow + 1; j < 10; j++) {
          if (matrix[j*10 +curCol + temp2] === value) {
              countRightDown++;
              temp2++;
          }
          else break;
      }
      if (countRightDown + countLeftUp >= 5)
          return 1 // win
  }



   checkDraw(matrix) {
      if(matrix.filter(element => element === '').length !== 0) return false;
      return true;
   }

   checkWin(matrix, x ,y, value){

      if(this.checkDiagonal(matrix,x,y,value) || this.checkHorizontal(matrix,x,y,value) 
         || this.checkMainDiagonal(matrix,x,y,value) || this.checkVertically(matrix,x,y,value)){
            console.log("checkwin true "+JSON.parse(localStorage.getItem('gameUserInfor')).room_id);
            indexAction.sendResultGame({
               result: "lose",
               sender: JSON.parse(localStorage.getItem("userInfor")).username,
               room_id: JSON.parse(localStorage.getItem('gameUserInfor')).room_id,
            })
            this.state.result = "You win"
            this.showModal()
            // alert("You win");
         }
      else if(this.checkDraw(matrix)) 
      {
         console.log("checkwin draw")
         indexAction.sendResultGame({
            result: "draw",
            sender: JSON.parse(localStorage.getItem("userInfor")).username,
            room_id: JSON.parse(localStorage.getItem('gameUserInfor')).room_id,
         })
         this.state.result = "Draw"
        //  alert("Draw");
      }  
      else 
         console.log("checkwin false")

   }

   showCell(value){
      let src;
      if (value === 1)
      {
         src="https://i.pinimg.com/564x/0e/f3/88/0ef388a7c15a72578a8bdaef6665696a.jpg" 
         return(
            <img src={src}></img>
         )
      }
      else if (value === 2) 
      {
         src="https://i.pinimg.com/564x/81/a2/54/81a2541db762d74e3c753e17c5960eeb.jpg"
         return(
            <img src={src}></img>
         )
      }


   }

   handleClick(event,index){
    if(this.props.canGo)
    {
        if( this.props.board[index]==='')
        { 
        this.state.host === JSON.parse(localStorage.getItem('userInfor')).username ? this.state.value=1 : this.state.value=2 ; // 1 host
        this.state.board[index] = this.state.value;

        const turnInfor = {
            user_id: JSON.parse(localStorage.getItem('userInfor'))._id,
            room_id: JSON.parse(localStorage.getItem('roomInfor')).id === undefined? JSON.parse(localStorage.getItem('roomInfor')).room_id : JSON.parse(localStorage.getItem('roomInfor')).id,
            x: Math.floor(index/10),
            y: index%10,
            value: this.state.value,
            canGo: false,
            isEndGame: false,
        }

        this.props.playTurn(turnInfor);
        this.checkWin(this.state.board,Math.floor(index/10),index%10,this.state.value)

        }
        else
            alert("Cell not empty")
    }
    else
      
       alert("Is not your turn");
   }


   createCell(){
      if(typeof this.props.board !=="undefined"){
          let listCell = this.props.board.map(
              (each,index) =>{
                  return(
                     <button 
                           onClick={(e)=>this.handleClick(e,index)}
                       >                     
                           {this.showCell(each)}
                     </button>

                  )
              }
          );
          return listCell;
  
      }
   }

 

   showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.props.history.push({
        pathname: '/'
    })
    this.setState({
      visible: false,
    });
  };



    render(){
        return(
            <div>
                <div className="board-grid" 
                    >
                {
                    this.createCell()
                }
                </div>
                <Modal
                    title="Result game"
                    visible={this.state.visible || this.props.visible}
                    onOk={this.handleOk}
                    >
                        {this.state.result == 'Draw' ? this.props.result : this.state.result}
                    </Modal>
            </div>

        )
    }
}


function mapStatetoProps(state){

   return{
     board: state.boardGame.board,
     canGo: state.boardGame.canGo,
     result: state.boardGame.result,
     visible: state.boardGame.visible,

   }
}


const mapDispatchToProps = (dispatch) =>{
   return{
       playTurn: turnInfor => dispatch(indexAction.playTurn(turnInfor))
   }
}
 
 
 export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(Board));
 