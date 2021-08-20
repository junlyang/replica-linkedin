import axios from 'axios';
import {ADD_FOLLOWS_SUCCESS,ADD_FOLLOWS_FAILURE,GET_FOLLOWS_SUCCESS,GET_FOLLOWS_FAILURE,
  GET_FOLLOWS_REQUEST_SUCCESS,GET_FOLLOWS_REQUEST_FAILURE,
  ACCEPT_FOLLOWS_REQUEST_SUCCESS,ACCEPT_FOLLOWS_REQUEST_FAILURE
} from '../reducers/follow'

export const addFollow = async (data) => {
  console.log('addFollow', data)
  try {
    const result = await axios.post('http://localhost:1337/follows', 
    {from : data.from, to: data.to})
    console.log('Well done!');
    console.log('addFollow', result.data);

    return  {
      type: ADD_FOLLOWS_SUCCESS,
      data: result.data
    }
  }
  catch (e) {
    return  {
        type: ADD_FOLLOWS_FAILURE,
        error: e 
    }
  }
}
export const getFollows = async (id) => {
  console.log('get Follows', id)
  try {
    const result = await axios.get(`http://localhost:1337/follows?_where[_or][0][from]=${id}&_where[_or][1][to]=${id}`)
    console.log('Well done!');
    console.log('get Follows', result.data);

    return  {
      type: GET_FOLLOWS_SUCCESS,
      payload: result.data
    }
  }
  catch (e) {
    return  {
        type: GET_FOLLOWS_FAILURE,
        error: e 
    }
  }
}
export const getFollowsRequest = async (id) => {
  console.log('get Follows', id)
  try {
    const result = await axios.get(`http://localhost:1337/follows?_where[to]=${id}&_where[isAccepted]=false`)
    console.log('Well done!');
    console.log('get Follows', result.data);

    return  {
      type: GET_FOLLOWS_REQUEST_SUCCESS,
      payload: result.data
    }
  }
  catch (e) {
    return  {
        type: GET_FOLLOWS_REQUEST_FAILURE,
        error: e 
    }
  }
}
export const acceptFollowRequest = async (data) => {
  console.log('acceptFollowRequest', data)
  try {
    const result = await axios.put(`http://localhost:1337/follows/${data.id}`,{
      ...data,
      isAccepted: 'true'
    })
    console.log('Well done!');
    console.log('acceptFollowRequest', result.data);

    return  {
      type: ACCEPT_FOLLOWS_REQUEST_SUCCESS,
      data: result.data
    }
  }
  catch (e) {
    return  {
        type: ACCEPT_FOLLOWS_REQUEST_FAILURE,
        error: e 
    }
  }
}
  