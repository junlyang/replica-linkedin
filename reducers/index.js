import { combineReducers } from 'redux'
import test from './test'
import user from './user'
import experience from './experience'
const rootReducer = combineReducers({
    test,user,experience
})

export default rootReducer