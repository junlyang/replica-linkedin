import { combineReducers } from 'redux'
import experience from './experience'
import profile from './profile'
import user from './user'

const rootReducer = combineReducers({
    user,experience,profile
})

export default rootReducer