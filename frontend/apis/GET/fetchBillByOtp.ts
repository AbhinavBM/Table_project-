import axios from 'axios'
import {BillDetails} from '../types'
import {TEST_URL} from './../../URL'
const fetchBillByOtp=async(otp:string) :Promise<BillDetails>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/waiter/getRunningBillByOtp/${otp}`);
        return response.data.billDetails;
      } catch (error:any) {
        console.error('Error fetching menu:', error);
        throw new Error('Error fetching Bill ')
    }
}

export default fetchBillByOtp;