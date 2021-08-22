export const initialState = {
    isLoggedIn: false,
    me : null,
    error : null,
    user: null,
    users: []
}; 

export const LOG_IN = 'LOG_IN' // 액션 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' // 액션 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' // 액션 이름

export const LOG_OUT = 'LOG_OUT' // 액션 이름
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS' // 액션 이름
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE' // 액션 이름

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS' // 액션 이름
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE' // 액션 이름

export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS' // 액션 이름
export const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE' // 액션 이름

export const PATCH_USERS_SUCCESS = 'PATCH_USERS_SUCCESS'
export const PATCH_USERS_FAILURE = 'PATCH_USERS_FAILURE'

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
                me: action.user,
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
        case GET_USERS_SUCCESS : {
            return {
                ...state,
                users: action.payload
            }
        }
        case GET_USERS_FAILURE : {
            return {
                ...state,
                error: action.error
            }
        }
        case GET_USER_BY_ID_SUCCESS : {
            return {
                ...state,
                user: action.payload
            }
        }
        case GET_USER_BY_ID_FAILURE : {
            return {
                ...state,
                error: action.error
            }
        }
        case PATCH_USERS_SUCCESS : {
            return {
                ...state,
                me: action.user,
                user: action.user
            }
        }
        case PATCH_USERS_FAILURE : {
            return {
                ...state,
                error: action.error
            }
        }
        default:
            return state;
    }
};

export default reducer;