import React from 'react';
import {  Card} from 'react-bootstrap';


export default class ChatMessage extends React.Component {
   constructor(props){
       super(props);

       this.state ={
           sender: this.props.sender === JSON.parse(localStorage.getItem('userInfor')).username? "you": this.props.sender,
            content: this.props.content,
            style: this.props.sender === JSON.parse(localStorage.getItem('userInfor')).username? "left": "right"
       }
   } 

  render() {

    return (
          <Card className={"card-message "+this.state.style}>
            {this.state.sender}: {this.state.content}
            </Card>
    );
  }
}

