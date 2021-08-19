import axios from 'axios';
import {ADD_FOLLOWS_SUCCESS,ADD_FOLLOWS_FAILURE,GET_FOLLOWS_SUCCESS,GET_FOLLOWS_FAILURE} from '../reducers/follow'

export const addFollow = async (data) => {
  console.log('addFollow', data)
  try {
    const result = await axios.post('http://localhost:1337/friends', 
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
export const getFollows = async (data) => {
  console.log('get Follows', data)
  try {
    const result = await axios.get('http://localhost:1337/friends?_where[0][from.id]=611d08b3c3dc3c6778e0bebb')
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
  