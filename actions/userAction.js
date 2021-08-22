import axios from 'axios';
import {
  LOG_IN_SUCCESS,LOG_IN_FAILURE,GET_USERS_SUCCESS,GET_USERS_FAILURE,GET_USER_BY_ID_SUCCESS,GET_USER_BY_ID_FAILURE,
  PATCH_USERS_SUCCESS,PATCH_USERS_FAILURE
} from '../reducers/user'
import io from "socket.io-client";

export const signUp = async (data) => {
    console.log("signUp",data)
    axios.post('http://localhost:1337/auth/local/register', data)
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
}

export const logIn = async (data) => {
  try {
    const result = await axios.post('http://localhost:1337/auth/local', {
      identifier: data.userId,
      password: data.password,
    })
    console.log('Well done!');
    console.log('User profile', result.data.user);
    console.log('User token', result.data.jwt);

    localStorage.setItem('token',result.data.jwt)

    return  {
      type: LOG_IN_SUCCESS,
      user: result.data.user
    }
  }
  catch (e) {
    return  {
        type: LOG_IN_FAILURE,
        error: e 
    }
  }
}

export const getUserById = async (id) => {
  console.log("getUserById",id)
  try {
      const result = await axios.get(`http://localhost:1337/users/${id}`);
      return  {
          type: GET_USER_BY_ID_SUCCESS,
          payload: result.data
      }
  } catch (e) {
      return  {
          type: GET_USER_BY_ID_FAILURE,
          error: e 
      }
  }
}
export const patchOpen = async (data) => {
  console.log("patchOpen", data)
  try {
      const result = await axios.put(`http://localhost:1337/users/${data.id}`,{
        ...data,
        opened: !data.opened
      })
      return  {
          type: PATCH_USERS_SUCCESS,
          user: result.data
      }
  } catch (e) {
      return  {
          type: PATCH_USERS_FAILURE,
          error: e 
      }
  }
}
export const getUsers = async () => {
  console.log("getUsers",)
  try {
      const result = await axios.get(`http://localhost:1337/users`);
      return  {
          type: GET_USERS_SUCCESS,
          payload: result.data
      }
  } catch (e) {
      return  {
          type: GET_USERS_FAILURE,
          error: e 
      }
  }
}