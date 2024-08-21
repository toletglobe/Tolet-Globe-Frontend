import axios from 'axios';
import { BASE_URL } from '../constant/constant';

class Authentication {
    static async Login(){
        try {
            const response= await axios.post(`${BASE_URL}login`,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default Authentication