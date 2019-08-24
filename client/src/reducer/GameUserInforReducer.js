import * as actionTypes from '../action/ActionType';

export default(state = [], action)=>{
    switch(action.type){
        case actionTypes.CREATE_GAME_USER_INFOR:
            return action.gameUserInfor;  
        default:
            return state;
    }
}