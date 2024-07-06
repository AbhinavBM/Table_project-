import axios from 'axios'
import {TEST_URL} from './../../URL'
const fetchDetails=async({otp,tableNo}:{otp:string,tableNo:string}) :Promise<any>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getUserId/${otp}/${tableNo}`);
        return response.data;
      } catch (error:any) {
        console.error('Error fetching menu:', error);
        throw new Error('Failed to send POST request: ' + error.message)
    }
}

export default fetchDetails;