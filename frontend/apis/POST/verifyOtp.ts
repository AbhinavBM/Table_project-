import axios from 'axios'
import {VerifyRequest} from '../types'
import { TEST_URL } from './../../URL';
const verifyOtp = async (data: VerifyRequest) => {
  const url = `${TEST_URL}/api/client/verifyOtp`;
  
  try {
    const response = await axios.post(url, {
      user_id: data.user_id,
      otp: data.otp
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
   console.log("hello")
    return error;
  }
};

export default verifyOtp;






