import axios from 'axios'
import {DrinksGET} from '../types'
import { TEST_URL } from './../../URL';

const fetchDrinksByCategory=async(category:string) :Promise<DrinksGET[]>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getDrink/${category}`);
        console.log(response)
        return response.data.drinks;
      } catch (error) {
        console.error('Error fetching menu:', error);
        return [];
    }
}

export default fetchDrinksByCategory;