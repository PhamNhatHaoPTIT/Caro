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
            console.log("result game "+ JSON.stringify (action.boardGame))

            state.result = "You "+ action.boardGame.result;
            state.visible = true;
            return state;    
         
        default:
            console.log("default board game");

            state.board = new Array(100).fill('');
            state.result = "Draw";
            state.visible = false
            state.canGo = true;
            return state;
    }


}