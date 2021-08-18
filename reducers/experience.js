export const initialState = {
    experiences : [],
    error : null,
}; 

export const GET_EXPERIENCE = 'GET_EXPERIENCE' // 액션 이름
export const GET_EXPERIENCE_SUCCESS = 'GET_EXPERIENCE_SUCCESS' // 액션 이름
export const GET_EXPERIENCE_FAILURE = 'GET_EXPERIENCE_FAILURE' // 액션 이름

export const getExperienceAction = data => ({ 
    type : GET_EXPERIENCE,
    data : data,
});

export const logoutAction = () => ({
    type : LOG_OUT
})

const reducer = (state=initialState, action) => { 
    console.log("EXPERIENCE REDUCER ", action)
    switch (action.type) {  
        case GET_EXPERIENCE:
            return {
                ...state,
            }
        case GET_EXPERIENCE_SUCCESS: {
            return {
                ...state,
                experiences: action.user,
            }
        }
        case GET_EXPERIENCE_FAILURE: {
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