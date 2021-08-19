import axios from 'axios';
import {GET_PROFILES_SUCCESS,GET_PROFILES_FAILURE} from '../reducers/profile'

export const getProfiles = async () => {
    console.log("getProfiles",)
    try {
        const result = await axios.get(`http://localhost:1337/profiles`);
        return  {
            type: GET_PROFILES_SUCCESS,
            payload: result.data
        }
    } catch (e) {
        return  {
            type: GET_PROFILES_FAILURE,
            error: e 
        }
    }
}