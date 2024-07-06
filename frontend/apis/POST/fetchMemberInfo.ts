import axios from 'axios'
import {TEST_URL} from '../../URL'
const fetchMemberInfo=async(member_id:String) :Promise<any>=>{
    try {
        const response = await axios.get(`${TEST_URL}/api/admin/getMemberByMembershipId/${member_id}`);
        console.log(response.data)
        return response.data.member;
      } catch (error) {
        console.error('Error fetching dish categories:', error);
        return [];
    }
}

export default fetchMemberInfo;