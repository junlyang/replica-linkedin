export const initialState = {
    profiles : [],
    error : null,
}; 

export const GET_PROFILES = 'GET_PROFILES' // 액션 이름
export const GET_PROFILES_SUCCESS = 'GET_PROFILES_SUCCESS' // 액션 이름
export const GET_PROFILES_FAILURE = 'GET_PROFILES_FAILURE' // 액션 이름

const reducer = (state=initialState, action) => { 
    console.log("PROFILES REDUCER ", action)
    switch (action.type) {  
        case GET_PROFILES:
            return {
                ...state,
            }
        case GET_PROFILES_SUCCESS: {
            return {
                ...state,
                profiles: action.payload,
            }
        }
        case GET_PROFILES_FAILURE: {
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