import { BASE_URL } from "../constant/constant"

class Service {
    static async fetchblog(){
    try {
        const response = await fetch(`${BASE_URL}blogs`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
    }
    static async fetchBlogById(_id){
        try {
            const response = await fetch(`${BASE_URL}blogs/${_id}`,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
export default Service