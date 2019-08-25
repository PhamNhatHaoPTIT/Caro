import * as actionTypes from '../action/ActionType';



export default (state = [], action) => {
    switch(action.type){
        case actionTypes.CREATE_MESSAGE:
            return[...state,Object.assign({},action.chatMessage)];
        default:
            return state;
    }


}


