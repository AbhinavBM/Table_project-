import axios from 'axios'
import {Dish} from '../types'
import {TEST_URL} from './../../URL'
const fetchDishesByCategory=async(category:String) :Promise<Dish[]>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getDish/${category}`);
        return response.data.dishes;
      } catch (error) {
        console.error('Error fetching category:', error);
        return [];
    }
}

export default fetchDishesByCategory;