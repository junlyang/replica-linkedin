const initialState = {
    isLoggedIn: false,
    isCreator: false,
    isPartner: false,
    user: null,
    myPageInfo: {},
    myCreatorInfo: {},
    loginData: null,
    address: {},
    subscribeList: [],
    creator: {},
    error: '',
}
export const LOG_IN = 'LOG_IN' // 액션 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' // 액션 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' // 액션 이름

export const loginAction = data => {
    return {
        type: LOG_IN,
        data: data,
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = { ...initialState }, action) => {
    console.log('REDUCERS USER',action)
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: false,
                loginData: null,
            }
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
                isCreator: action.isCreator,
                isPartner: action.isPartner,
            }
        }
        case LOG_IN_FAILURE: {
            return {
                ...state,
                isLoggedIn: false,
                error: action.error,
                user: null,
                isCreator: false,
            }
        }
        default:
            return state;
    }
}
export default reducer;