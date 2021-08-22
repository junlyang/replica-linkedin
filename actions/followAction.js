import axios from 'axios';
import io from "socket.io-client";
import {ADD_FOLLOWS_SUCCESS,ADD_FOLLOWS_FAILURE,GET_FOLLOWS_SUCCESS,GET_FOLLOWS_FAILURE,
  GET_FOLLOWS_REQUEST_SUCCESS,GET_FOLLOWS_REQUEST_FAILURE,
  ACCEPT_FOLLOWS_REQUEST_SUCCESS,ACCEPT_FOLLOWS_REQUEST_FAILURE,
  REJECT_FOLLOWS_REQUEST_SUCCESS,REJECT_FOLLOWS_REQUEST_FAILURE
} from '../reducers/follow'

export const addFollow = async (data) => {
  console.log('addFollow', data)
  try {
    const result = await axios.post('http://localhost:1337/follows', 
    {from : data.from, to: data.to})
    console.log('Well done!');
    console.log('addFollow', result.data);

    const socket = io.connect('http://localhost:4002', { transports: ['websocket'] })
    socket.emit('followRequest',{ uid: result.data.to.id})

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
    const result = await axios.get(`http://localhost:1337/follows?_where[_or][0][0][from]=${id}&_where[_or][0][1][isBlocked]=false&_where[_or][1][0][to]=${id}&_where[_or][1][1][isBlocked]=false`)
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
    const result = await axios.get(`http://localhost:1337/follows?_where[to]=${id}&_where[isAccepted]=false&_where[isBlocked]=false`)
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

    
    const socket = io.connect('http://localhost:4002', { transports: ['websocket'] })
    socket.emit('followAccept',{ uid: result.data.from.id})


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
export const rejectFollowRequest = async (data) => {
  console.log('rejectFollowRequest', data)
  try {
    const result = await axios.put(`http://localhost:1337/follows/${data.id}`,{
      ...data,
      isBlocked: 'true'
    })
    console.log('Well done!');
    console.log('rejectFollowRequest', result.data);

    return  {
      type: REJECT_FOLLOWS_REQUEST_SUCCESS,
      data: result.data
    }
  }
  catch (e) {
    return  {
        type: REJECT_FOLLOWS_REQUEST_FAILURE,
        error: e 
    }
  }
}
  