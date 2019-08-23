import React from 'react';
import sakura from '../../media/flower.png';
import leaf from '../../media/leaf.jpg';

export default class Cell extends React.Component {
  constructor(props){
    super(props)

    console.log("value"+this.props.value);

    this.state ={
    
      id: "cell-"+this.props.id,
      value: this.props.value,

    }

    
  }

  // getValue(){
  //   if(this.state.value ==='X'){
  //     document.getElementById("imgcell-"+this.state.id).innerHTML='<img src={leaf} width="30px" height="30px" ></img>';
  //     // return(
  //     //   <img src={leaf} width="30px" height="30px" ></img>
  //     // );
  //   }
  //   if(this.state.value ==='O'){
  //       document.getElementById("imgcell-"+this.state.id).innerHTML='<img src={sakura} width="30px" height="30px" ></img>';
        
  //   }
  // }



//   componentDidUpdate(prevProps, prevState) {

//     console.log('componentDidUpdate ' + prevProps.value+" "+this.state.value);
   
//     // this.getValue();

// }
// componentWillUpdate(nextProps, nextState) {
//   console.log('componentWillUpdate ' + nextProps.value);

// }

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

