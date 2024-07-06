import axios from 'axios'
import {Dish} from '../types'
// import {TEST_URL} from './../../URL'
const fetchDishesByKeyWord=async(keyword:string) :Promise<Dish[]>=>{
    try {
        const response = await axios.get(`https://abue8wn735.execute-api.ap-south-1.amazonaws.com/api/client/FoodSearch/${keyword}`);
        return response.data.results;
      } catch (error) {
        console.error('Error fetching menu:', error);
        return [];
    }
}

export default fetchDishesByKeyWord;