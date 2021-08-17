import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import {
  LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILURE 
}from '../reducers/user'
import axios from 'axios'

function loginAPI(loginData) {
  return axios.post('/user', loginData)
}

function* login(action) {
  console.log('action!!!!!!!!!!!!!: ',action)
  try {
      const result = yield call(loginAPI, action.data)
      console.log('login result', result)
      
      yield put({
          type: LOG_IN_SUCCESS,
          user: { ...result.data, accessToken: action.data.accessToken },
      })
      action.callback(result)
  } catch (e) {
      console.error(e)
      yield put({ type: LOG_IN_FAILURE, error: e })
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN, login)
}

export default function* userSaga() {
  // fork 비동기,
  yield all([
      fork(watchLogin),
  ])
}