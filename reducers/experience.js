const initialState = {
    experiences: []
}

export const GET_EXPERIENCE = 'GET_EXPERIENCE' // 액션 이름
export const GET_EXPERIENCE_SUCCESS = 'GET_EXPERIENCE_SUCCESS' // 액션 이름
export const GET_EXPERIENCE_FAILURE = 'GET_EXPERIENCE_FAILURE' // 액션 이름

export const getExperienceAction = data => {
    return {
        type: GET_EXPERIENCE,
        data: data,
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = { ...initialState }, action) => {
    console.log('REDUCERS EXPERIENCE',action)
    switch (action.type) {
        case GET_EXPERIENCE: {
            return {
                ...state,
                experiences: [],
            }
        }
        case GET_EXPERIENCE_SUCCESS: {
            return {
                ...state,
                experiences: action,
            }
        }
        case GET_EXPERIENCE_FAILURE: {
            return {
                ...state,
                experiences: [],
            }
        }
        default:
            return state;
    }
}
export default reducer;