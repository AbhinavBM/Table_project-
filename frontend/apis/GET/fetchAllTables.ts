import axios from 'axios'
import {TEST_URL} from './../../URL'
import { Table }from './../types'
const fetchAllTables=async() :Promise<Table[]>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/client/getAllTables`);
        return response.data.tables;
      } catch (error) {
        console.error('Error fetching dish categories:', error);
        return [];
    }
}

export default fetchAllTables;