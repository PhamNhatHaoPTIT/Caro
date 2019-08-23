import * as actionTypes from '../action/ActionType';

const initialRoomState = {

    roomItems:[]
}

export default (state = [], action) => {
    switch(action.type){
        case actionTypes.CREATE_NEW_ROOM:
            return[...state,Object.assign({},action.roomInfor)];
        default:
            return state;
    }


}


