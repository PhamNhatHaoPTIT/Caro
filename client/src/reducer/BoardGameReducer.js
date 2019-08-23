import * as actionTypes from '../action/ActionType';
import { connect } from 'net';
import Connection from '../websocket/Connection';



// export default () =>  {
//     return( {
    
//         board: new Array(100).fill(''),
//         stepNumber: 0,
//         xTurn: true,
//         endOfGame: false
//     }
// )
// }
   

export default (state = [], action) => {
    switch(action.type){
            
        case actionTypes.PLAY_TURN:
            var newMatrix = state.board.map( e=>e);
            newMatrix[action.boardGame.x*10+action.boardGame.y] = action.boardGame.value;

            state.board = newMatrix;
            return state;
         
        default:
            state.board = new Array(100).fill('');
            return state;
    }


}