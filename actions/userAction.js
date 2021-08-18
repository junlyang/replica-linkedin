import axios from 'axios';
import {LOG_IN_SUCCESS,LOG_IN_FAILURE} from '../reducers/user'
// Request API.
// Add your own code here to customize or restrict how the public can register new users.
export const signUp = async (userId) => {
    console.log("signUp",userId)
    axios.post('http://localhost:1337/auth/local/register', {
    username: 'Strapi user',
    email: 'user@strapi.io',
    password: 'strapiPassword',
  })
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