export const initialState = {
    follows : [],
    followsRequest: [] ,
    error : null,
}; 

export const GET_FOLLOWS = 'GET_FOLLOWS' // 액션 이름
export const GET_FOLLOWS_SUCCESS = 'GET_FOLLOWS_SUCCESS' // 액션 이름
export const GET_FOLLOWS_FAILURE = 'GET_FOLLOWS_FAILURE' // 액션 이름

export const ADD_FOLLOWS = 'ADD_FOLLOWS' // 액션 이름
export const ADD_FOLLOWS_SUCCESS = 'ADD_FOLLOWS_SUCCESS' // 액션 이름
export const ADD_FOLLOWS_FAILURE = 'ADD_FOLLOWS_FAILURE' // 액션 이름

export const GET_FOLLOWS_REQUEST_SUCCESS = 'GET_FOLLOWS_REQUEST_SUCCESS'
export const GET_FOLLOWS_REQUEST_FAILURE = 'GET_FOLLOWS_REQUEST_FAILURE'

export const ACCEPT_FOLLOWS_REQUEST_SUCCESS = 'ACCEPT_FOLLOWS_REQUEST_SUCCESS'
export const ACCEPT_FOLLOWS_REQUEST_FAILURE = 'ACCEPT_FOLLOWS_REQUEST_FAILURE'

export const REJECT_FOLLOWS_REQUEST_SUCCESS = 'REJECT_FOLLOWS_REQUEST_SUCCESS'
export const REJECT_FOLLOWS_REQUEST_FAILURE = 'REJECT_FOLLOWS_REQUEST_FAILURE'


const reducer = (state=initialState, action) => { 
    console.log("FOLLOWS REDUCER ", action)
    switch (action.type) {  
        case GET_FOLLOWS:
            return {
                ...state,
            }
        case GET_FOLLOWS_SUCCESS: {
            return {
                ...state,
                follows: action.payload,
            }
        }
        case GET_FOLLOWS_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }
        case GET_FOLLOWS_REQUEST_SUCCESS : {
            return {
                ...state,
                followsRequest: action.payload,
            }
        }
        case GET_FOLLOWS_REQUEST_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }
        
        case ADD_FOLLOWS_SUCCESS: {
            return {
                ...state,
                follows: [...state.follows,action.data],
            }
        }
        case ADD_FOLLOWS_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }      
        case ACCEPT_FOLLOWS_REQUEST_SUCCESS : {
            return {
                ... state,
                followsRequest: [...state.followsRequest.filter(follow => follow.id !== action.data.id)],
                follows : [ ...state.follows.map(follow=> follow.id == action.data.id ? {...follow,isAccepted:true} : follow) ]
            }
        }
        case ACCEPT_FOLLOWS_REQUEST_FAILURE : {
            return {
                ...state,
                error: action.error,
            }
        }
        case REJECT_FOLLOWS_REQUEST_SUCCESS : {
            return {
                ... state,
                followsRequest: [...state.followsRequest.filter(follow => follow.id !== action.data.id)],
                follows : [ ...state.follows.filter(follow => follow.id !== action.data.id) ]
            }

        }
        case REJECT_FOLLOWS_REQUEST_FAILURE : {
            return {
                ...state,
                error: action.error,
            }
        }
        default:
            return state;
    }
};

export default reducer;