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
            var newState = {...state};
            newState.board = state.board.map( e=>e);
            newState.board[action.boardGame.x*10+action.boardGame.y] = action.boardGame.value;
            newState.canGo = action.boardGame.canGo;

            return newState;
        case actionTypes.CREATE_RESULT_GAME:
            var newState = {...state};
            newState.result = "You "+ action.boardGame.result;
            newState.visible = true;
            return newState;    
        case actionTypes.CREATE_MESSAGE:
            return state;
        default:
            state.board = new Array(100).fill('');
            state.result = "Draw";
            state.visible = false
            state.canGo = true;
            return state;
    }


}