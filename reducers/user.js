export const initialState = {
    isLoggedIn: false,
    me : null,
    error : null,
}; 

export const LOG_IN = 'LOG_IN' // 액션 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' // 액션 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' // 액션 이름

export const LOG_OUT = 'LOG_OUT' // 액션 이름
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS' // 액션 이름
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE' // 액션 이름

export const loginAction = data => ({ 
    type : LOG_IN,
    data : data,
});

export const logoutAction = () => ({
    type : LOG_OUT
})

const reducer = (state=initialState, action) => { 
    switch (action.type) {  
        case LOG_IN:
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                me: action.data,
            }
        }
        case LOG_IN_FAILURE: {
            return {
                ...state,
                isLoggedIn: false,
                error: action.error,
                me: null,
            }
        }    
        case LOG_OUT: {
            return {
                ...state,
            }
        }
        case LOG_OUT_SUCCESS: {
            return {
                ...state,
                me: null,
                isLoggedIn: false,
            }
        }
        case LOG_OUT_FAILURE: {
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