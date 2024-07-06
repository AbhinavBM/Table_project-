import axios from 'axios'
import {TEST_URL} from './../../URL'
import { Membership } from './../types';
const fetchAllMembers=async() :Promise<Membership[]>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/admin/getAllMembersFormatted/`);
        console.log(response.data.members)
        return response.data.members;
      } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

export default fetchAllMembers;