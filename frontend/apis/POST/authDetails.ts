import axios, { AxiosResponse } from 'axios'
import {UserField , UserResponse} from './../types'
import { TEST_URL } from '../../URL';
const postUserData=async(data:UserField)=>{
    const url = `${TEST_URL}/api/client/createCustomer`; 
  try {
    const response: AxiosResponse<UserResponse> = await axios.post(url, data);

    return response.data;
  } catch (error:any) {
    throw new Error('Failed to send POST request: ' + error.message);
  }
}

export default postUserData;
