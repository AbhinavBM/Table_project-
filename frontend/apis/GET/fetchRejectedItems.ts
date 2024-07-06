// localhost:2000/api/client/getRejectedItemsByOrderId/782fb6ca-0d79-4cbe-b238-318066712689
import axios from 'axios'
import {RejectedOrder} from './../types'
import { TEST_URL } from './../../URL';
const fetchRejectedOrders=async(Orders_id:string) :Promise<RejectedOrder[]>=>{
    console.log("hello called")
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getRejectedItemsByOrderId/${Orders_id}`);
        return response.data.rejectedItems;
      } catch (error) {
        console.error('Error fetching menu:', error);
        return [];
    }
}

export default fetchRejectedOrders;