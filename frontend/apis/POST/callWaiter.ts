import axios, { AxiosResponse } from 'axios'
import {UserStateNotification, UserResponse} from './../types'
import { TEST_URL } from '../../URL';

const callWaiter=async(data:UserStateNotification)=>{
    const url=`${TEST_URL}/api/client/callWaiter`; 
  try {
    const response: AxiosResponse<UserResponse | any> = await axios.post(url, data);
    return response.data;
  } catch (error:any) {
    throw new Error('Failed to send POST request: ' + error.message);
  }
}

export default callWaiter;
