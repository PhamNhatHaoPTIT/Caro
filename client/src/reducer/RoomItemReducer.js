import * as actionTypes from '../action/ActionType';
import * as  ArrayList from 'arraylist';

const initialRoomState = {

    roomItems:[]
}

export default (state = [], action) => {
    switch(action.type){
        case actionTypes.CREATE_NEW_ROOM:
            return[...state,Object.assign({},action.roomInfor)];

        case actionTypes.CREATE_LIST_ROOM:
            return[...state,Object.assign({},action.roomInfor)];

        case actionTypes.DELETE_ROOM:
            console.log("delete room "+ JSON.stringify(state)+" "+JSON.stringify(action.roomInfor)+" "+(state[0].id != action.roomInfor.id && typeof state[0].id !== undefined) ||state[0].host != action.roomInfor.host )
            var newState= new ArrayList;
            for(let i=0;i<state.length;i++)
                
                if(state[i].id != action.roomInfor.id && typeof state[i].id !== undefined && state[i].host != action.roomInfor.host)
                {
                    newState.add(state[i])
                }
            console.log("after delete room "+ JSON.stringify(newState))

            return newState
 
        default:
            return state;
    }


}


