import axios from 'axios'
import { DrinksGET} from '../types'
// import {TEST_URL} from './../../URL'
const fetchDrinkByKeyWord=async(keyword:string) :Promise<DrinksGET[]>=>{
    try {
        const response = await axios.get(`https://abue8wn735.execute-api.ap-south-1.amazonaws.com/api/client/DrinkSearch/${keyword}`);
        return response.data.results;
      } catch (error) {
        console.error('Error fetching menu:', error);
        return [];
    }
}

export default fetchDrinkByKeyWord;