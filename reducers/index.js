import { combineReducers } from 'redux'
import experience from './experience'
import profile from './profile'
import user from './user'
import follow from './follow'

const rootReducer = combineReducers({
    user,experience,profile,follow
})

export default rootReducer