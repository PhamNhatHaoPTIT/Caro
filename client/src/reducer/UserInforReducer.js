import * as actionTypes from '../action/ActionType';

export default(state = [], action)=>{
    switch(action.type){
        case actionTypes.ADD_USER_INFOR:
            return[...state,Object.assign({},action.user)];  
        
        default:
            return state;
    }
}
