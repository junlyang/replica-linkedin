import { all, call } from 'redux-saga/effects'
import user from './user'
import experience from './experience'
export default function* rootSaga() {
    yield all([
        call(user),
        call(experience)
    ])
}