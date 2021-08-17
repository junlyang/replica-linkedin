import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import {
    GET_EXPERIENCE,GET_EXPERIENCE_SUCCESS,GET_EXPERIENCE_FAILURE 
}from '../reducers/experience'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

function getExperienceAPI() {
  console.log('getExperienceAPI')
  return axios.get('/experiences').then(function (response) {
  	console.log(response);
  })
  .catch(function (error) {
  	console.log(error);
  })
}

function* experience(action) {
  console.log('action!!!!!!!!!!!!!: ',action)
  try {
      const result = yield call(getExperienceAPI)
      console.log('login result', action,result)
      
      yield put({
          type: GET_EXPERIENCE_SUCCESS,
          data: { ...result},
      })
      action.callback(result)
  } catch (e) {
      console.error(e)
      yield put({ type: GET_EXPERIENCE_FAILURE, error: e })
  }
}

function* watchExperience() {
  yield takeLatest(GET_EXPERIENCE, experience)
}

export default function* experienceSaga() {
  // fork 비동기,
  yield all([
      fork(watchExperience),
  ])
}
