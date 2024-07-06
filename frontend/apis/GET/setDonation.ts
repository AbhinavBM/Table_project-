import axios from 'axios'
import { TEST_URL } from './../../URL';
const setDonationAmt=async(user_id:string,donationAmount:string) :Promise<any>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/setDonationByUserId/${user_id}/${donationAmount}`);
        return response.data;
      } catch (error) {
        console.error('Er', error);
        throw new Error('Failed to send POST request: ' + error)
    }
}

export default setDonationAmt;