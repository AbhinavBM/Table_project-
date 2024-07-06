import axios, { AxiosResponse } from 'axios';
import { Orders , ResponseDataOrders} from '../types';
import { TEST_URL } from '../../URL';

const placeOrder=async (data: Orders)=>{
  try {
    const response: AxiosResponse<ResponseDataOrders> = await axios.post(
      `${TEST_URL}/api/client/setOrders`,
      data
    );
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export default placeOrder;
