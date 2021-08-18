import { combineReducers } from 'redux'
import experience from './experience'
import user from './user'

const rootReducer = combineReducers({
    user,experience
})

export default rootReducer