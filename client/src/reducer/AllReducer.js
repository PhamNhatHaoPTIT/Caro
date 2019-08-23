import RankItemReducer from './RankItemReducer';
import {combineReducers} from 'redux';
import RoomItemReducer from './RoomItemReducer';
import UserInforReducer from './UserInforReducer';
import BoardGameReducer from './BoardGameReducer';
import ChatMessageReducer from './ChatMessageReducer';
import GameUserInforReducer from './GameUserInforReducer';

const allReducers = combineReducers({
    roomItems: RoomItemReducer,
    rankItems: RankItemReducer,
    userInfor: UserInforReducer,
    boardGame: BoardGameReducer,
    chatMessage: ChatMessageReducer,
    gameUserInfor: GameUserInforReducer,
})

export default allReducers;