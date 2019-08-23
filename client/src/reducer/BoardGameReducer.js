import * as actionTypes from '../action/ActionType';




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
            console.log("value turn "+action.boardGame.canGo)
            var newMatrix = state.board.map( e=>e);
            newMatrix[action.boardGame.x*10+action.boardGame.y] = action.boardGame.value;
            state.board = newMatrix;
            state.canGo = action.boardGame.canGo;
            return state;

        case actionTypes.CREATE_RESULT_GAME:
            state.isEndGame = true;
            return state;    
         
        default:
            state.board = new Array(100).fill('');
            state.isEndGame = false;
            JSON.parse(localStorage.getItem('roomInfor')).host === JSON.parse(localStorage.getItem('userInfor')).username ?  state.canGo = true : state.canGo = false;
            return state;
    }


}