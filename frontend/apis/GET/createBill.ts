import axios from 'axios'
import {TEST_URL} from './../../URL'
const createBill=async(user_id:string,amt:string,membership_id:string) :Promise<any>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/createBillByUserId/${user_id}/${amt}/${membership_id}`);
        console.log(response.data)
        return response.data;
      } catch (error:any) {
        console.error('Error fetching members:', error);
        throw new Error(error.response.data.message)
    }
}

export default createBill;