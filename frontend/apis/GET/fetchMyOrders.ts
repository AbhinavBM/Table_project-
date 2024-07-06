import axios from 'axios'
import {GetOrderResponse} from './../types'
import { TEST_URL } from './../../URL';

const fetchMyOrders=async(user_id:string) :Promise<GetOrderResponse>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getOrderByUserId/${user_id}`);
        console.log(response)
        return response.data;
      } catch (error) {
        console.error('Error fetching menu:', error);
        return { success: false, data: []};
    }
}

export default fetchMyOrders;