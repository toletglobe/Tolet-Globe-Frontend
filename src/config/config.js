import axios from "axios";
import { BASE_URL } from "../constant/constant";

class Service {
  static async fetchBlog() {
    try {
      const response = await axios.get(`${BASE_URL}blog/blogs`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async fetchBlogById(_id) {
    try {
      const response = await axios.get(`${BASE_URL}blog/blogs/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async fetchProperty(){
    try {
      const response = await axios.get(`${BASE_URL}property`,{
        headers:{
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
  static async fetchPropertyById(_id){
    try {
      const response = await axios.get(`${BASE_URL}property/${_id}`,{
        headers:{
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}

export default Service;
