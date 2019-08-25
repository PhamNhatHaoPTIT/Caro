import * as actionTypes from '../action/ActionType';

export default (state = [], action) => {
    switch(action.type){
        case actionTypes.CREATE_RANK_USER:
            return[...state,Object.assign({},action.rankItems)];
        case actionTypes.REFRESH_RANK_USER:
            return []
        default:
            return state;
    }


}


