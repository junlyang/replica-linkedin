export const initialState = {
    follows : [],
    error : null,
}; 

export const GET_FOLLOWS = 'GET_FOLLOWS' // 액션 이름
export const GET_FOLLOWS_SUCCESS = 'GET_FOLLOWS_SUCCESS' // 액션 이름
export const GET_FOLLOWS_FAILURE = 'GET_FOLLOWS_FAILURE' // 액션 이름

export const ADD_FOLLOWS = 'ADD_FOLLOWS' // 액션 이름
export const ADD_FOLLOWS_SUCCESS = 'ADD_FOLLOWS_SUCCESS' // 액션 이름
export const ADD_FOLLOWS_FAILURE = 'ADD_FOLLOWS_FAILURE' // 액션 이름


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
        
        default:
            return state;
    }
};

export default reducer;