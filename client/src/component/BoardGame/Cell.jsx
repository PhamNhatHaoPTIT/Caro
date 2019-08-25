import React from 'react';


export default class Cell extends React.Component {
  constructor(props){
    super(props)


    this.state ={
    
      id: "cell-"+this.props.id,
      value: this.props.value,

    }

    
  }



  render() {

    return (
      <button id={this.state.id}
           onClick={
             this.props.onClick}
             >
             {this.state.value}
      </button>
    );
  }
}

