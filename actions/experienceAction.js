import axios from 'axios';
import {GET_EXPERIENCE_SUCCESS, GET_EXPERIENCE_FAILURE} from '../reducers/experience'


export const getExperiences = async (userId) => {
    console.log("getExperiences",userId)
    try {
        const result = await axios.get(`http://localhost:1337/experiences`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
        });
        return  {
            type: GET_EXPERIENCE_SUCCESS,
            payload: result.data
        }
    } catch (e) {
        return  {
            type: GET_EXPERIENCE_FAILURE,
            error: e 
        }
    }
}