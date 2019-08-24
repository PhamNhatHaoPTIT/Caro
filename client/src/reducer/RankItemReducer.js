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


// export default () => {
//     return([{
//         username:"Im Jae Bum",
//         point:100,
//         avatar: '../media/youngjae.jpg',

//     },
//     {
//         username:"Choi Young Jae",
//         point:100,
//         avatar: '../media/youngjae.jpg',

//     },
//     {
//         username:"Park Jin Young",
//         point:100,
//         avatar: '../media/youngjae.jpg',

//     },
//     {
//         username:"Mark",
//         point:100,
//         avatar: '../media/youngjae.jpg',

//     },
//     {
//         username:"Jackson",
//         point:100,
//         avatar: '../media/youngjae.jpg',

//     },


//     ])
// }